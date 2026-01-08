const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    console.log("\n🧪 Starting Local Logic Test...\n");

    const [deployer] = await ethers.getSigners();
    console.log("👤 Deployer:", deployer.address);

    // 1. Deploy Fresh Contract
    const AnkushValidator = await ethers.getContractFactory("AnkushValidator");
    const validator = await AnkushValidator.deploy();
    await validator.waitForDeployment();
    const validatorAddress = await validator.getAddress();

    console.log("🏰 Contract Deployed at:", validatorAddress);

    // 2. Setup Agent
    const agent = ethers.Wallet.createRandom();
    console.log("🤖 AI Agent:", agent.address);

    // 3. Authorize
    console.log("\n🔗 Authorizing...");
    const limit = ethers.parseEther("1.0");
    const expiry = Math.floor(Date.now() / 1000) + 86400; // 24 hours

    const tx = await validator.enableSession(
        agent.address,
        ethers.ZeroAddress,
        limit,
        expiry
    );
    await tx.wait();
    console.log("✅ Authorized.");

    // Verify Policy
    const policy = await validator.policies(deployer.address, agent.address);
    console.log("📋 Policy ValidUntil:", policy.validUntil.toString());

    // 4. Simulate
    console.log("\n🧪 Executing...");
    const mockUserOpHash = ethers.keccak256(ethers.toUtf8Bytes("Execute Order 66"));
    const signature = await agent.signMessage(ethers.getBytes(mockUserOpHash));

    const mockUserOp = {
        sender: deployer.address,
        nonce: 0,
        initCode: "0x",
        callData: "0x",
        accountGasLimits: ethers.ZeroHash,
        preVerificationGas: 0,
        gasFees: ethers.ZeroHash,
        paymasterAndData: "0x",
        signature: signature
    };

    // 5. Validate
    console.log("🔍 Validating...");
    const res = await validator.validateUserOp.staticCall(mockUserOp, mockUserOpHash);
    console.log("📊 Result:", res.toString());

    if (res.toString() === "0") {
        console.log("✅ SUCCESS: Logic is sound.");
    } else {
        console.log("❌ FAILURE: Logic flaw detected.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
