import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, parseEther } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import { EventFactoryABI } from '@/lib/contracts'
import { uploadToIPFS } from '@/utils/ipfs'
import { encodeFunctionData } from 'viem'

// Get contract address for the current chain
function getContractAddress(chainId: number) {
  if (chainId === 8453) return process.env.NEXT_PUBLIC_EVENT_FACTORY_ADDRESS_MAINNET
  if (chainId === 84532) return process.env.NEXT_PUBLIC_EVENT_FACTORY_ADDRESS_SEPOLIA
  return null
}

// Validate event data
function validateEventData(data: any) {
  const errors: string[] = []
  
  // Required fields
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required')
  } else if (data.title.length > 100) {
    errors.push('Title must be 100 characters or less')
  }
  
  if (!data.category || typeof data.category !== 'string') {
    errors.push('Category is required')
  }
  
  if (!data.shortDescription || typeof data.shortDescription !== 'string' || data.shortDescription.trim().length === 0) {
    errors.push('Short description is required')
  } else if (data.shortDescription.length > 200) {
    errors.push('Short description must be 200 characters or less')
  }
  
  if (!data.fullDescription || typeof data.fullDescription !== 'string') {
    errors.push('Full description is required')
  } else if (data.fullDescription.length > 5000) {
    errors.push('Full description must be 5000 characters or less')
  }
  
  if (!data.startDateTime || !data.endDateTime) {
    errors.push('Start and end date/time are required')
  } else {
    const startTime = new Date(data.startDateTime).getTime()
    const endTime = new Date(data.endDateTime).getTime()
    const now = Date.now()
    
    if (isNaN(startTime) || isNaN(endTime)) {
      errors.push('Invalid date format')
    } else if (startTime <= now) {
      errors.push('Start time must be in the future')
    } else if (endTime <= startTime) {
      errors.push('End time must be after start time')
    }
  }
  
  if (!data.locationType || !['physical', 'virtual', 'hybrid'].includes(data.locationType)) {
    errors.push('Valid location type is required (physical, virtual, or hybrid)')
  }
  
  if (!data.ticketPrice || typeof data.ticketPrice !== 'number' || data.ticketPrice < 0) {
    errors.push('Valid ticket price is required')
  }
  
  if (!data.capacity || typeof data.capacity !== 'number' || data.capacity <= 0) {
    errors.push('Valid capacity is required')
  }
  
  if (data.maxTicketsPerWallet && (typeof data.maxTicketsPerWallet !== 'number' || data.maxTicketsPerWallet <= 0)) {
    errors.push('Max tickets per wallet must be a positive number')
  }
  
  // Location validation
  if (data.locationType === 'physical' || data.locationType === 'hybrid') {
    if (!data.address || !data.city || !data.country) {
      errors.push('Address, city, and country are required for physical locations')
    }
  }
  
  if (data.locationType === 'virtual' || data.locationType === 'hybrid') {
    if (!data.meetingLink) {
      errors.push('Meeting link is required for virtual events')
    }
  }
  
  // Image validation
  if (!data.coverImageUrl) {
    errors.push('Cover image is required')
  }
  
  return errors
}

// Create IPFS metadata
async function createEventMetadata(data: any) {
  const metadata = {
    title: data.title,
    category: data.category,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    locationType: data.locationType,
    location: {
      address: data.address || '',
      city: data.city || '',
      country: data.country || '',
      meetingLink: data.meetingLink || '',
    },
    dates: {
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
    },
    ticketing: {
      ticketPrice: data.ticketPrice,
      capacity: data.capacity,
      maxTicketsPerWallet: data.maxTicketsPerWallet || 1,
      enableWaitlist: data.enableWaitlist || false,
      refundPolicy: data.refundPolicy || 'full_refund_until_event',
    },
    media: {
      coverImageUrl: data.coverImageUrl,
      additionalImages: data.additionalImages || [],
      videoUrl: data.videoUrl || '',
    },
    translations: data.translations || {},
    createdAt: new Date().toISOString(),
    version: '1.0',
  }
  
  const uploadResult = await uploadToIPFS(metadata)
  return uploadResult.uri
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { walletAddress, chainId, ...eventData } = body
    
    // Validate wallet address
    if (!walletAddress || typeof walletAddress !== 'string') {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
    }
    
    // Validate chain ID
    const validChainIds = [8453, 84532] // Base Mainnet, Base Sepolia
    if (!validChainIds.includes(chainId)) {
      return NextResponse.json({ error: 'Invalid chain ID' }, { status: 400 })
    }
    
    // Validate event data
    const validationErrors = validateEventData(eventData)
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { status: 400 })
    }
    
    // Get contract address
    const contractAddress = getContractAddress(chainId)
    if (!contractAddress) {
      return NextResponse.json({ 
        error: 'EventFactory contract not deployed on this chain' 
      }, { status: 500 })
    }
    
    // Create IPFS metadata
    const metadataURI = await createEventMetadata(eventData)
    
    // Set up viem clients
    const chain = chainId === 8453 ? base : baseSepolia
    const transport = http(process.env.NEXT_PUBLIC_RPC_URL)
    
    // Note: In a real implementation, you would need to get the private key from secure storage
    // or use a service account for backend transactions
    // For now, this is a placeholder - the actual transaction should be initiated from the frontend
    
    const publicClient = createPublicClient({
      chain,
      transport,
    })
    
    // Estimate gas for the transaction
    try {
      const gasEstimate = await publicClient.estimateGas({
        account: walletAddress as `0x${string}`,
        to: contractAddress as `0x${string}`,
        data: '0x' + EventFactoryABI.find(abi => abi.type === 'function' && abi.name === 'createEvent')?.encodeFunctionData?.([
          metadataURI,
          BigInt(Math.floor(new Date(eventData.startDateTime).getTime() / 1000)),
          BigInt(Math.floor(new Date(eventData.endDateTime).getTime() / 1000)),
          BigInt(parseEther(eventData.ticketPrice.toString())),
          BigInt(eventData.capacity)
        ]) || '0x',
        value: 0n,
      })
      
      // For now, return the metadata URI and estimated gas
      // The actual contract call should be done from the frontend with user signature
      return NextResponse.json({
        success: true,
        metadataURI,
        estimatedGas: gasEstimate.toString(),
        contractAddress,
        chainId,
        message: 'Event metadata created. Please deploy from frontend with user signature.',
      })
      
    } catch (gasError: any) {
      return NextResponse.json({
        error: 'Gas estimation failed',
        details: gasError.message,
        metadataURI, // Return metadata even if gas estimation fails
      }, { status: 500 })
    }
    
  } catch (error: any) {
    console.error('Event creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}