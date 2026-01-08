"use client";

import { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreateAgentForm from "@/components/web3/CreateAgentForm";
import RoyalCard from "@/components/ui/RoyalCard";
import TheCore from "@/components/3d/TheCore";
import { ShieldCheck, Zap, Activity as ActivityIcon } from "lucide-react";
import ActivityFeed, { Activity } from "@/components/dashboard/ActivityFeed";
import AgentTrigger from "@/components/dashboard/AgentTrigger";

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", action: "SYSTEM_INIT", status: "success", time: "PRE-BOOT" }
  ]);

  const handleNewActivity = (activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
  };

  return (
    <main className="relative min-h-screen w-full bg-obsidian text-white overflow-hidden flex flex-col">

      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-royal-gradient opacity-80 z-0" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0 pointer-events-none" /> {/* Optional Noise */}

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-10 py-6 border-b border-white/5 bg-charcoal/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gold-500 rounded-full" />
          <h1 className="font-orbitron text-2xl font-bold tracking-widest text-gold-glow">ANKUSH</h1>
        </div>
        <div className="font-mono text-sm [data-rk]:!font-mono">
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={false}
            chainStatus="icon"
          />
        </div>
      </nav>

      {/* Main Grid */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-5 h-full">

        {/* Left: The Core (40%) */}
        <section className="lg:col-span-2 relative flex items-center justify-center p-10 border-r border-white/5 flex-col gap-6">
          <div className="absolute top-10 left-10 font-mono text-xs text-white/30 space-y-2">
            <p>CORE_SYSTEM: <span className="text-green-400">ONLINE</span></p>
            <p>NEURAL_LINK: <span className="text-green-400">STABLE</span></p>
            <p>LATENCY: <span className="text-gold-400">12ms</span></p>
          </div>

          <div className="w-full h-[400px] lg:h-[500px]">
            <TheCore />
          </div>

          <div className="w-full max-w-md h-64 z-20">
            <ActivityFeed activities={activities} />
          </div>
        </section>

        {/* Right: Control Panel (60%) */}
        <section className="lg:col-span-3 flex flex-col p-12 gap-8 overflow-y-auto">

          <header className="flex flex-col gap-2">
            <h2 className="font-orbitron text-4xl text-white tracking-wider">
              AI PAYMENT PROTOCOL <span className="text-gold-500 animate-pulse-slow">{"//"}</span> ACTIVE
            </h2>
            <p className="font-mono text-white/40 text-sm">
              SECURE_VAULT_ACCESS__V2.0.4
            </p>
          </header>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoyalCard delay={0.1} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <ActivityIcon className="text-gold-400 w-5 h-5" />
                <span className="text-xs font-mono text-white/30">VOL_24H</span>
              </div>
              <div className="text-3xl font-orbitron text-white">$12,400</div>
              <div className="text-xs text-green-400 mt-2 font-mono flex items-center gap-1">
                <span className="w-1 h-1 bg-green-400 rounded-full" /> +14.2%
              </div>
            </RoyalCard>

            <RoyalCard delay={0.2} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Zap className="text-gold-400 w-5 h-5" />
                <span className="text-xs font-mono text-white/30">AGENTS</span>
              </div>
              <div className="text-3xl font-orbitron text-white">4</div>
              <div className="text-xs text-gold-400/80 mt-2 font-mono">
                Running Optimal
              </div>
            </RoyalCard>

            <RoyalCard delay={0.3} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <ShieldCheck className="text-green-400 w-5 h-5" />
                <span className="text-xs font-mono text-white/30">HEALTH</span>
              </div>
              <div className="text-3xl font-orbitron text-white">100%</div>
              <div className="text-xs text-white/30 mt-2 font-mono">
                System Secure
              </div>
            </RoyalCard>
          </div>

          {/* Action Area: Create Agent (Web3) */}
          <CreateAgentForm />

          {/* Agent Trigger */}
          <AgentTrigger onActivity={handleNewActivity} />

        </section>
      </div>
    </main>
  );
}
