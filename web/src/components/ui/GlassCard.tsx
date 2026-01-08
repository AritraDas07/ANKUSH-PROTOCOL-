"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    onClick?: () => void;
}

export default function GlassCard({ children, className, title, onClick }: GlassCardProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/10",
                "bg-white/5 backdrop-blur-xl", // Ultra-premium glass
                "p-6 transition-all duration-500",
                "animate-float", // Anti-gravity float
                className
            )}
            onClick={onClick}
        >
            {/* Cinematic Glow effect */}
            <div className="absolute -z-10 -inset-1 bg-gradient-to-br from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 hover:opacity-100 transition-opacity duration-700" />

            {title && (
                <div className="mb-4 border-b border-white/10 pb-2">
                    <h3 className="text-lg font-sans font-medium text-yellow-50/90 tracking-widest uppercase">{title}</h3>
                </div>
            )}

            <div className="font-mono">
                {children}
            </div>
        </motion.div>
    );
}
