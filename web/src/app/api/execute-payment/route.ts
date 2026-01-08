import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { ANKUSH_VALIDATOR_ABI } from '@/constants/abi';

// Use Environment Variables
const RPC_URL = process.env.RPC_URL || "https://sepolia.base.org";
const PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;
const USER_ADDRESS = process.env.USER_ADDRESS;
const VALIDATOR_ADDRESS = "0xf17100750917377eabEA95b4e33Bc25778713448";

export async function POST(request: Request) {
    console.log("📨 API Action: execute-payment");

    if (!PRIVATE_KEY || !USER_ADDRESS) {
        return NextResponse.json(
            { status: "error", message: "Server Misconfiguration: Missing keys" },
            { status: 500 }
        );
    }

    try {
        const { amount, recipient } = await request.json();

        if (!amount || !recipient) {
            return NextResponse.json(
                { status: "failed", message: "Missing amount or recipient" },
                { status: 400 }
            );
        }

        // Initialize Provider & Signer
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const agentWallet = new ethers.Wallet(PRIVATE_KEY, provider);

        // 1. Create a logical "Task Hash" for this payment
        const intentMessage = `Execute Payment: ${amount} ETH to ${recipient}`;
        const mockUserOpHash = ethers.keccak256(ethers.toUtf8Bytes(intentMessage));

        console.log("   📜 Task Hash:", mockUserOpHash);

        // 2. Sign the Hash (AI Agent uses its Session Key)
        const signature = await agentWallet.signMessage(ethers.getBytes(mockUserOpHash));

        // 3. Validate against the Live Contract
        // Note: We use the ABI from @/constants/abi which we know exists
        const validator = new ethers.Contract(VALIDATOR_ADDRESS, ANKUSH_VALIDATOR_ABI, provider);

        // Mock UserOp
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

        // Call static
        const validationResult = await validator.validateUserOp.staticCall(mockUserOp, mockUserOpHash);

        if (validationResult.toString() === "0") {
            return NextResponse.json({
                status: "success",
                message: "Payment Authorized by Protocol",
                signature: signature,
                hash: mockUserOpHash
            });
        } else {
            return NextResponse.json({
                status: "failed",
                message: "Permission Denied by Ankush Protocol",
                code: validationResult.toString()
            }, { status: 403 });
        }

    } catch (error: any) {
        console.error("❌ Agent Error:", error.message);
        return NextResponse.json(
            { status: "error", message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
