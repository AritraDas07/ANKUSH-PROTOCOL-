"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RoyalCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    delay?: number;
}

export default function RoyalCard({ children, className, onClick, delay = 0 }: RoyalCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            whileHover={{
                scale: 1.01,
                borderColor: "rgba(234, 179, 8, 0.3)",
                backgroundColor: "rgba(10, 10, 15, 0.6)"
            }}
            className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-charcoal/40 backdrop-blur-xl", // Hyper-Glass base
                "border border-white/5", // Subtle border
                "shadow-2xl shadow-black/50",
                "transition-colors duration-300",
                className
            )}
            onClick={onClick}
        >
            {/* Cinematic Glass Shimmer on Hover */}
            <div className="absolute inset-0 bg-glass-shimmer opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {children}
        </motion.div>
    );
}
