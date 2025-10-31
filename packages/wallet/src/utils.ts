// Wallet utility functions

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function isValidAddress(address: string): boolean {
  // TODO: Implement proper address validation
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function getExplorerUrl(chainId: number, address: string, type: 'address' | 'tx' = 'address'): string {
  const explorers: Record<number, string> = {
    8453: 'https://basescan.org',
    84532: 'https://sepolia.basescan.org',
  };

  const baseUrl = explorers[chainId];
  if (!baseUrl) return '';

  return `${baseUrl}/${type}/${address}`;
}

export function formatBalance(balance: bigint, decimals = 18): string {
  // TODO: Implement proper balance formatting
  return (Number(balance) / 10 ** decimals).toFixed(4);
}
