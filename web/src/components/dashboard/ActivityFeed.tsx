"use client";

import RoyalCard from "@/components/ui/RoyalCard";
import { Clock, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Activity {
    id: string;
    action: string;
    status: "success" | "processing" | "failed";
    time: string;
    hash?: string;
}

interface ActivityFeedProps {
    activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
    return (
        <RoyalCard className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Clock className="w-5 h-5 text-gold-500" />
                <h3 className="font-orbitron text-lg text-white tracking-widest">PROTOCOL_NEURAL_LOG</h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {activities.length === 0 ? (
                    <div className="text-center text-white/20 font-mono text-sm py-10">
                        NO_ACTIVITY_DETECTED
                    </div>
                ) : (
                    activities.map((item) => (
                        <div
                            key={item.id}
                            className="group flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {item.status === 'processing' ? (
                                    <Loader2 className="w-4 h-4 text-gold-500 animate-spin" />
                                ) : item.status === 'success' ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500" />
                                )}

                                <div>
                                    <div className={cn(
                                        "font-mono text-sm",
                                        item.status === 'processing' ? "text-gold-300 animate-pulse" :
                                            item.status === 'success' ? "text-green-300" : "text-red-300"
                                    )}>
                                        {item.action}
                                    </div>
                                    {item.hash && (
                                        <div className="text-[10px] text-white/30 font-mono mt-1">
                                            HASH: {item.hash.substring(0, 10)}...
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-xs font-mono text-white/40">
                                {item.time}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </RoyalCard>
    );
}
