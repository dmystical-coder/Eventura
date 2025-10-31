import { ethers } from 'hardhat';

async function main() {
  console.log('Starting deployment to Base...');

  // TODO: Deploy EventFactory contract
  // const EventFactory = await ethers.getContractFactory('EventFactory');
  // const eventFactory = await EventFactory.deploy();
  // await eventFactory.waitForDeployment();
  // console.log('EventFactory deployed to:', await eventFactory.getAddress());

  // TODO: Deploy EventTicketing contract
  // TODO: Deploy TicketMarketplace contract
  // TODO: Set up initial roles and permissions
  // TODO: Verify contracts on BaseScan

  console.log('Deployment completed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
