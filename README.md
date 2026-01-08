# 🛡️ ANKUSH: The Payment Protocol for the AI Economy

> **Winner Track:** The Payment Protocol for the AI Economy
> **Network:** Base Sepolia

**Ankush** is a decentralized security layer that enables AI Agents to transact autonomously on the blockchain *without* exposing the user's main private key.

## 🧠 The Problem
As AI agents become autonomous, they need to pay for resources (APIs, storage, compute). Currently, giving an AI a wallet means giving it a Private Key. If the AI is hacked or hallucinates, the entire wallet is drained.

## 💡 The Solution: Session Keys
Ankush implements **Modular Smart Account Validators**.
1.  **Delegate:** Users authorize a temporary "Session Key" for their AI Agent.
2.  **Restrict:** Users set strict spending limits (e.g., "Max 100 USDC") and expiration times.
3.  **Transact:** The AI Agent signs transactions with its Session Key. The **AnkushValidator** contract verifies the permission on-chain before executing the payment.

**Result:** You can trust an AI with your money, because you can't lose more than the allowance.

## ⚡ Tech Stack
* **Blockchain:** Base Sepolia (Testnet)
* **Contracts:** Solidity, Hardhat, OpenZeppelin ECDSA
* **Frontend:** Next.js 15, Tailwind CSS, Framer Motion, React Three Fiber (The "Royal X" Dashboard)
* **Backend:** Node.js, Express, Ethers.js (Simulating the AI Nervous System)
* **Integration:** Wagmi, Viem, RainbowKit

## 🚀 How to Run Locally

### 1. Prerequisites
* Node.js v18+
* Metamask Wallet

### 2. Installation
```bash
# Clone the repo
git clone [https://github.com/YOUR_USERNAME/ankush.git](https://github.com/YOUR_USERNAME/ankush.git)
cd ankush

# Install Monorepo dependencies
cd web && npm install
cd ../contracts && npm install
cd ../functions && npm install
3. Deploy Contracts (Base Sepolia)
Bash

cd contracts
npx hardhat run scripts/deploy.ts --network sepolia
# Copy the deployed Validator Address
4. Start the "AI Brain" (Backend)
Bash

cd functions
# Configure .env with your Agent Private Key and Validator Address
node server.js
5. Launch the Command Center (Frontend)
Bash

cd web
npm run dev
📸 Demo Workflow
Connect Wallet to the Royal X Dashboard.

Create Agent: Authorize a new Session Key with a spending limit.

Trigger AI: Click "Execute Autonomous Payment."

Verify: Watch the transaction validate on-chain via the Activity Feed.

📜 Contract Details
Validator Address: [PASTE YOUR CONTRACT ADDRESS HERE]

Network: Base Sepolia

Built with ❤️ for the AI x Web3 Hackathon.
