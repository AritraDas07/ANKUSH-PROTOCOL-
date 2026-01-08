"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Copy, Check } from "lucide-react";
import { ANKUSH_VALIDATOR_ABI, VALIDATOR_ADDRESS } from "@/constants/abi";

export default function CreateAgentForm() {
    const [agentAddress, setAgentAddress] = useState("");
    const [limit, setLimit] = useState("");
    const [copied, setCopied] = useState(false);

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash });

    const handleCreateSession = async () => {
        if (!agentAddress || !limit) return;

        // Convert limit to Wei (basic implementation, assumes input is in Wei for now or needs parseEther)
        // For this demo, let's treat input as raw uint256 or basic number string
        const limitValue = BigInt(limit);
        const expiry = BigInt(Math.floor(Date.now() / 1000) + 86400); // 24h from now

        // @ts-ignore
        writeContract({
            address: VALIDATOR_ADDRESS as `0x${string}`,
            abi: ANKUSH_VALIDATOR_ABI,
            functionName: 'enableSession',
            args: [
                agentAddress as `0x${string}`, // Agent Address
                "0x0000000000000000000000000000000000000000" as any, // Vendor (Allow all for demo)
                limitValue, // Spending Limit
                expiry // Expiry
            ] as any,
        });
    };

    const copyToClipboard = () => {
        if (hash) {
            navigator.clipboard.writeText(hash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="relative group p-1">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />

            <div className="relative bg-charcoal/90 backdrop-blur-xl border border-white/10 p-8 rounded-xl shadow-2xl">

                {/* Header */}
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <div className="w-20 h-20 border border-gold-500/20 rounded-full flex items-center justify-center animate-spin-slow">
                        <div className="w-16 h-16 border-t border-gold-500/40 rounded-full" />
                    </div>
                </div>

                <h3 className="font-orbitron text-2xl text-gold-glow mb-6">DEPLOY NEW AGENT</h3>

                <div className="space-y-6 max-w-lg relative z-10">

                    {/* Inputs */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gold-500/80 tracking-widest pl-1">AGENT ADDRESS</label>
                        <input
                            type="text"
                            value={agentAddress}
                            onChange={(e) => setAgentAddress(e.target.value)}
                            placeholder="0x..."
                            disabled={isPending || isConfirming}
                            className="w-full bg-charcoal/80 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/20 transition-all placeholder:text-white/20 disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gold-500/80 tracking-widest pl-1">SPENDING LIMIT (WEI)</label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                placeholder="1000000000"
                                disabled={isPending || isConfirming}
                                className="flex-1 bg-charcoal/80 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/20 transition-all placeholder:text-white/20 disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setLimit("1000000000000000000")} // 1 ETH
                                className="px-6 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-mono text-white/50 transition-colors"
                            >
                                1 ETH
                            </button>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="button"
                        onClick={handleCreateSession}
                        disabled={isPending || isConfirming || !agentAddress || !limit}
                        className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/30 text-black font-orbitron font-bold py-4 rounded-lg mt-4 shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all transform hover:-translate-y-1 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'CONFIRMING...' : isConfirming ? 'PROCESSING...' : 'INITIALIZE AGENT'}
                    </button>

                    {/* Status Feedback */}
                    {hash && (
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <div className="flex items-center justify-between text-green-400 font-mono text-sm mb-2">
                                <span>TX SUBMITTED</span>
                                <button onClick={copyToClipboard} className="hover:text-green-300">
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="text-xs text-white/50 break-all font-mono">
                                {hash}
                            </div>
                            {isConfirmed && (
                                <div className="mt-2 text-xs text-gold-500 font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                                    AGENT ACTIVATED
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
