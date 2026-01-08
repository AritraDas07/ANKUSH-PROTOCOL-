import { ethers } from "hardhat";

async function main() {
    const AnkushValidator = await ethers.getContractFactory("AnkushValidator");
    const validator = await AnkushValidator.deploy();

    await validator.waitForDeployment();

    console.log("🛡️ Ankush Shield Deployed to:", await validator.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
