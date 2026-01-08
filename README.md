<div align="center">
<img width="497" height="502" alt="Gemini_Generated_Image_1cc3tk1cc3tk1cc3-removebg-preview (1)" src="https://github.com/user-attachments/assets/6ce00f1e-0c5e-46db-8659-370e4bc356d5" />

</div>



# 🛡️ ANKUSH: The Payment Protocol for the AI Economy

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://ankush-protocol.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network: Base Sepolia](https://img.shields.io/badge/Network-Base%20Sepolia-blue)](https://sepolia.basescan.org/)
[![Status: Live](https://img.shields.io/badge/Status-Live%20Beta-success)](https://ankush-protocol.vercel.app/)

**Trustless Financial Rails for the Agentic Future.**

[Launch Dashboard](https://ankush-protocol.vercel.app/) • [View Contract](https://sepolia.basescan.org/address/0xf17100750917377eabEA95b4e33Bc25778713448) • [Watch Demo](https://youtu.be/YOUR_VIDEO_LINK)

</div>

---

## 📖 Table of Contents
1. [Executive Summary](#-executive-summary)
2. [The Problem](#-the-problem)
3. [The Solution: Ankush Protocol](#-the-solution-ankush-protocol)
4. [Key Features](#-key-features)
5. [Technical Architecture](#-technical-architecture)
6. [Live Deployment Details](#-live-deployment-details)
7. [Getting Started (Demo Guide)](#-getting-started-demo-guide)
8. [Local Development](#-local-development)
9. [Roadmap](#-roadmap)
10. [Team](#-team)

---

## 📋 Executive Summary
**Ankush** is a decentralized security protocol designed to facilitate the "Agentic Economy." It enables AI Agents to hold and spend cryptocurrency autonomously without requiring direct access to a user's master Private Key. By implementing **Programmable Session Keys** and **Modular Validators**, Ankush acts as a financial firewall, ensuring that AI agents operate within strict, pre-defined financial boundaries.

---

## 🛑 The Problem

As Large Language Models (LLMs) evolve into autonomous agents, they need to pay for resources (API credits, storage, computational power) to function independently.

However, the current Web3 infrastructure presents a critical security dilemma:
* **The "Custodial" Risk:** Giving an AI agent a wallet means giving it a Private Key. If the model hallucinates, gets prompt-injected, or the server is compromised, the entire wallet can be drained.
* **The "Approval" Bottleneck:** If a human must sign every transaction, the AI is no longer autonomous.
* **Lack of Granularity:** Standard ERC-20 allowances are "all or nothing" for a specific spender, lacking time-based or logic-based restrictions.

---

## 💡 The Solution: Ankush Protocol

Ankush introduces **Ephemeral Session Keys** enforced by smart contracts.

Instead of sharing a master key, a user generates a temporary, limited-permission key for their AI agent. The **AnkushValidator** smart contract intercepts every transaction attempted by the AI and verifies:
1.  **Identity:** Is this key currently authorized by the user?
2.  **Scope:** Is the transaction value within the `spendingLimit`?
3.  **Time:** Is the session still valid (`validUntil`)?

If any check fails, the transaction reverts on-chain, making it mathematically impossible for the AI to overspend.

---

## ✨ Key Features

### 🔐 1. Non-Custodial Security
Users never share their main private key with the AI or the application backend. The AI operates using a disposable key that holds **zero funds** itself; it only has *permission* to spend from the user's vault.

### 💸 2. Granular Spending Limits
Set precise allowances (e.g., "10 USDC per day" or "Total 0.05 ETH"). This limits the "Blast Radius" of a hack to only the remaining allowance of that specific session.

### ⚡ 3. One-Click Authorization
Users sign a single transaction to onboard an agent. Once authorized, the agent can execute thousands of transactions autonomously until the session expires.

### 🖥️ 4. "Royal X" Command Center
A high-performance, 3D dashboard built with **React Three Fiber** that visualizes agent activity, active sessions, and real-time security logs.

---

## 🏗️ Technical Architecture

The system follows a **Monolithic Vercel Architecture** for speed and reliability.

```mermaid
graph TD
    User[User (MetaMask)] -->|1. Authorize Session| Contract[AnkushValidator Contract]
    AI[AI Agent (Backend)] -->|2. Generate Tx Signature| AI_Key[Session Key (Ephemeral)]
    AI_Key -->|3. Submit UserOp| Contract
    Contract -->|4. Verify Permissions| Ledger[Blockchain Ledger]
    Ledger -->|5. Execute Payment| Recipient

```

* **Smart Contracts:** Solidity v0.8.19 using OpenZeppelin `ECDSA` for cryptographic signature recovery.
* **Frontend:** Next.js 15 (App Router) with Tailwind CSS and Framer Motion.
* **3D Visuals:** Three.js / React Three Fiber.
* **Integration:** Wagmi (React Hooks for Ethereum) and Viem (TypeScript Interface).
* **Backend API:** Next.js API Routes acting as the "Nervous System" for the AI Agent.

---

## 🌐 Live Deployment Details

| Component | Status | Address / Link |
| --- | --- | --- |
| **Network** | Base Sepolia | `Chain ID: 84532` |
| **Smart Contract** | Verified | [`0xf17100750917377eabEA95b4e33Bc25778713448`](https://www.google.com/url?sa=E&source=gmail&q=https://sepolia.basescan.org/address/0xf17100750917377eabEA95b4e33Bc25778713448) |
| **Frontend** | Active | [https://ankush-protocol.vercel.app/](https://ankush-protocol.vercel.app/) |
| **Demo Agent** | Online | `0x2Db58ea81A79A4E5B2f06233723c94A0303983E9` |

---

## 🚀 Getting Started (Demo Guide)

**Judges:** Follow this flow to test the "Autonomous Payment" capabilities.

### Phase 1: The Manager (Frontend)

1. Open the [Dashboard](https://ankush-protocol.vercel.app/).
2. Connect your Wallet (Base Sepolia).
3. Scroll to the **"Create New Agent"** card.
4. Enter the Demo Agent Address: `0x2Db58ea81A79A4E5B2f06233723c94A0303983E9`
5. Set a spending limit (e.g., `1000`).
6. Click **Create Session** and confirm the transaction.

### Phase 2: The Agent (Backend)

1. Scroll down to the **"TRIGGER AUTONOMOUS PAYMENT"** button.
2. Click the button. This signals the backend AI to construct and sign a transaction.
3. **Observe:** The *Protocol Neural Log* will turn **Green**, indicating the Smart Contract successfully validated the AI's signature against your policy.

---

## 💻 Local Development

If you wish to run the protocol locally:

```bash
# 1. Clone the repository
git clone [https://github.com/AritraDas07/ANKUSH-PROTOCOL-.git](https://github.com/AritraDas07/ANKUSH-PROTOCOL-.git)

# 2. Install dependencies
cd web
npm install

# 3. Configure Environment
# Create a .env file in /web and add:
# NEXT_PUBLIC_RPC_URL="[https://sepolia.base.org](https://sepolia.base.org)"
# AGENT_PRIVATE_KEY="[YOUR_TEST_KEY]"

# 4. Run the Development Server
npm run dev

```

---

## 🗺️ Roadmap

* **Q1 2026:** Mainnet Deployment on Base.
* **Q2 2026:** Integration with **Superfluid** for streaming payments (paying AI per second of compute).
* **Q3 2026:** Multi-chain support (Optimism, Arbitrum) using Chainlink CCIP.
* **Q4 2026:** SDK Release for AI Developers (Python/LangChain integration).

---

## 👥 Team

* **Aritra Das** - Team Lead & Full Stack Architect
* **Ankan Saha** - Blockchain Developer
* **Suhani Singh** - Frontend Engineer
* **Anurag Das** - UI/UX Designer

---

<div align="center">
<sub>Built with ❤️ at the International Web3 Hackathon 2026</sub>
</div>

```

```
