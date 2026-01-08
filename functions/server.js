require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const ANKUSH_VALIDATOR_ABI = require('./abi');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Configuration
const RPC_URL = process.env.RPC_URL || "https://sepolia.base.org";
const PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;
const VALIDATOR_ADDRESS = "0xf17100750917377eabEA95b4e33Bc25778713448";
const USER_ADDRESS = process.env.USER_ADDRESS; // The user we are spending on behalf of

if (!PRIVATE_KEY || !USER_ADDRESS) {
    console.error("❌ Mising AGENT_PRIVATE_KEY or USER_ADDRESS in .env");
    process.exit(1);
}

// Initialize Provider & Signer
const provider = new ethers.JsonRpcProvider(RPC_URL);
const agentWallet = new ethers.Wallet(PRIVATE_KEY, provider);

console.log("🤖 AI Agent Server Initialized");
console.log("   Agent Address:", agentWallet.address);
console.log("   Acting for User:", USER_ADDRESS);

app.post('/api/execute-payment', async (req, res) => {
    try {
        const { amount, recipient } = req.body;

        if (!amount || !recipient) {
            return res.status(400).json({ status: "failed", message: "Missing amount or recipient" });
        }

        console.log(`\n📨 Payment Request: ${amount} ETH to ${recipient}`);

        // 1. Create a logical "Task Hash" for this payment
        // In a real AA system, we would construct the full UserOperation struct here.
        // For this demo/v1 simulation, we hash the intent directly to prove the signature flow.
        const intentMessage = `Execute Payment: ${amount} ETH to ${recipient}`;
        const mockUserOpHash = ethers.keccak256(ethers.toUtf8Bytes(intentMessage));

        console.log("   📜 Task Hash:", mockUserOpHash);

        // 2. Sign the Hash (AI Agent uses its Session Key)
        const signature = await agentWallet.signMessage(ethers.getBytes(mockUserOpHash));
        console.log("   ✍️  Agent Signature:", signature);

        // 3. Validate against the Live Contract
        const validator = new ethers.Contract(VALIDATOR_ADDRESS, ANKUSH_VALIDATOR_ABI, provider);

        // Mock UserOp for validation call
        const mockUserOp = {
            sender: USER_ADDRESS,
            nonce: 0,
            initCode: "0x",
            callData: "0x",
            accountGasLimits: ethers.ZeroHash,
            preVerificationGas: 0,
            gasFees: ethers.ZeroHash,
            paymasterAndData: "0x",
            signature: signature
        };

        console.log("   🔍 Verifying on Base Sepolia...");

        // Call static to verify
        const validationResult = await validator.validateUserOp.staticCall(mockUserOp, mockUserOpHash);

        console.log("   📊 Validation Code:", validationResult.toString());

        if (validationResult.toString() === "0") {
            console.log("   ✅ SUCCESS: Payment Authorized.");
            return res.json({
                status: "success",
                message: "Payment Authorized by Protocol",
                signature: signature,
                hash: mockUserOpHash
            });
        } else {
            console.warn("   ❌ FAILED: Protocol Denied Permission.");
            return res.status(403).json({
                status: "failed",
                message: "Permission Denied by Ankush Protocol",
                code: validationResult.toString()
            });
        }

    } catch (error) {
        console.error("   ❌ ERROR:", error.message);
        return res.status(500).json({ status: "error", message: error.message });
    }
});

// Export for Cloud Functions
exports.app = app;

// Only listen if running locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 AI Server running on http://localhost:${PORT}`);
    });
}
