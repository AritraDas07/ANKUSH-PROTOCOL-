const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
    console.log("\n🚀 Starting AI Agent Simulation (Debug Mode)...\n");

    const provider = ethers.provider;
    const network = await provider.getNetwork();
    console.log("🌐 Connected to Chain ID:", network.chainId.toString());

    // 1. Setup Identities
    const [deployer] = await ethers.getSigners();
    const agent = ethers.Wallet.createRandom();

    console.log("👤 User (Deployer):", deployer.address);
    console.log("🤖 AI Agent (New):", agent.address);

    // 2. Target Contract
    const VALIDATOR_ADDRESS = "0xf17100750917377eabEA95b4e33Bc25778713448";

    // DEBUG: Check code existence
    const code = await provider.getCode(VALIDATOR_ADDRESS);
    if (code === "0x") {
        console.error("❌ CRITICAL: No code found at contract address on this chain!");
        console.error("   User might need to update VALIDATOR_ADDRESS or switch networks.");
        return;
    }
    console.log("🏰 Contract verified (Code exists).");

    const validator = await ethers.getContractAt("AnkushValidator", VALIDATOR_ADDRESS);

    // 3. Authorization
    console.log("\n🔗 Authorizing AI Agent...");
    const limit = ethers.parseEther("1.0");
    const expiry = Math.floor(Date.now() / 1000) + 86400; // 24 hours

    const tx = await validator.enableSession(
        agent.address,
        ethers.ZeroAddress,
        limit,
        expiry
    );

    console.log("⏳ Transaction sent:", tx.hash);
    await tx.wait();
    console.log("✅ Authorization confirmed.");

    // DEBUG: verify policy was set
    const policy = await validator.policies(deployer.address, agent.address);
    console.log("📋 Policy Check:");
    console.log("   Allowed Vendor:", policy.allowedVendor);
    console.log("   Valid Until:   ", policy.validUntil.toString());
    console.log("   Current Block: ", (await provider.getBlock("latest")).timestamp);

    if (policy.validUntil == 0) {
        console.error("❌ Policy not set correctly! (ValidUntil is 0)");
    }

    // 4. The Work
    console.log("\n🧪 Simulating Task Execution...");
    const mockUserOpHash = ethers.keccak256(ethers.toUtf8Bytes("Execute Order 66"));
    console.log("📜 Task Hash:", mockUserOpHash);

    // 5. Sign
    const signature = await agent.signMessage(ethers.getBytes(mockUserOpHash));
    console.log("✍️  Agent Signature:", signature);

    // 6. Validate
    const mockUserOp = {
        sender: deployer.address, // Correct - the "Wallet" is the sender
        nonce: 0,
        initCode: "0x",
        callData: "0x", // Empty calldat to bypass vendor check
        accountGasLimits: ethers.ZeroHash,
        preVerificationGas: 0,
        gasFees: ethers.ZeroHash,
        paymasterAndData: "0x",
        signature: signature
    };

    console.log("\n🔍 Verifying Signature on-chain...");

    try {
        const validationResult = await validator.validateUserOp.staticCall(mockUserOp, mockUserOpHash);

        // In canonical packed format, 0 is success. 
        // If it's returning packed uint256: [authorizer(20)][validUntil(6)][validAfter(6)]
        // Success is 0 (authorizer 0, validUntil 0? No, validUntil 0 means expired???)
        // Wait, canonical 4337 return value:
        // SIG_VALIDATION_SUCCESS = 0
        // SIG_VALIDATION_FAILED = 1
        // Packed: return 0 means validAfter=0, validUntil=0 (valid indefinitely? No, validUntil=0 is expired).
        // Actually, `AnkushValidator` returns `uint256`.
        // In my code: return 0 or 1.
        // IT DOES NOT RETURN PACKED DATA IN THIS V0 IMPLEMENTATION.
        // It strictly returns 0 or 1.

        console.log("📊 Validation Result:", validationResult.toString());

        if (validationResult.toString() === "0") {
            console.log("🚀 Validation Successful! The AI Agent is authorized.");
        } else {
            console.log("❌ Validation Failed. Return code:", validationResult.toString());
            if (validationResult.toString() === "1") console.log("   Reason: Expired, Invalid Vendor, or Invalid Limit.");
        }

    } catch (error) {
        console.error("❌ Validation Error:", error.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
