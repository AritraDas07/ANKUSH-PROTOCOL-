"use client";

import { useState } from "react";
import RoyalCard from "@/components/ui/RoyalCard";
import { Zap } from "lucide-react";
import { Activity } from "./ActivityFeed";

interface AgentTriggerProps {
    onActivity: (activity: Activity) => void;
}

export default function AgentTrigger({ onActivity }: AgentTriggerProps) {
    const [loading, setLoading] = useState(false);

    const executeTask = async () => {
        if (loading) return;
        setLoading(true);

        const activityId = Date.now().toString();

        // Add Processing Activity
        onActivity({
            id: activityId,
            action: "ANALYZING MARKET CONDITIONS...",
            status: "processing",
            time: "NOW"
        });

        try {
            // Step 1: Simulate "Thinking"
            await new Promise(r => setTimeout(r, 1500));

            onActivity({
                id: activityId,
                action: "SIGNING PAYLOAD (SESSION KEY)...",
                status: "processing",
                time: "NOW"
            });

            // Step 2: Call Backend
            // Vercel / Next.js Internal API - Always relative
            const apiUrl = '/api/execute-payment';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: "10", // Demo amount
                    recipient: "0x000000000000000000000000000000000000dEaD" // Burn address
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                // Success
                onActivity({
                    id: activityId,
                    action: "PAYMENT AUTHORIZED",
                    status: "success",
                    hash: data.hash,
                    time: "JUST NOW"
                });
            } else {
                throw new Error(data.message || "Failed");
            }

        } catch (error) {
            onActivity({
                id: activityId,
                action: "EXECUTION FAILED",
                status: "failed",
                time: "ERROR"
            });
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            alert("Agent Failed: " + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RoyalCard className="p-1 relative overflow-hidden group cursor-pointer" onClick={executeTask}>
            <div className={`absolute inset-0 bg-gold-500/20 blur-xl transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

            <div className="relative bg-charcoal/90 backdrop-blur-xl border border-gold-500/30 p-6 flex items-center justify-between rounded-xl">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center ${loading ? 'animate-spin' : ''}`}>
                        <Zap className={`w-6 h-6 text-gold-500 ${loading ? 'animate-pulse' : ''}`} />
                    </div>
                    <div>
                        <h3 className="font-orbitron text-white text-lg tracking-wider">
                            {loading ? "NEURAL ENGINE ACTIVE" : "TRIGGER AUTONOMOUS PAYMENT"}
                        </h3>
                        <p className="font-mono text-gold-500/60 text-xs">
                            {loading ? "PROCESSING SIGNATURE..." : "READY FOR COMMAND"}
                        </p>
                    </div>
                </div>

                <div className="h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
            </div>
        </RoyalCard>
    );
}
