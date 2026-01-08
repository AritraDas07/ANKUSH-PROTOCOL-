const hre = require("hardhat");

async function main() {
    const AnkushValidator = await hre.ethers.getContractFactory("AnkushValidator");
    const validator = await AnkushValidator.deploy();

    await validator.waitForDeployment();

    console.log("🛡️ Ankush Shield Deployed to:", await validator.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
