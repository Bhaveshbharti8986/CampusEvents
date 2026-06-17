import React from "react";

export default function LoadingSpinner({ text = "Signing you in..." }) {
  return (
    // 'flex-1' and 'h-full' ensure it perfectly stretches inside your AuthLayout
    // without ever breaking the borders or overflowing.
    <div className="flex flex-col items-center justify-center w-full h-full min-h-60 gap-8">
      
      {/* 1. THE SPINNING BORDER RING */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* The glowing outer gradient that spins */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_40%,var(--brand-primary)_80%,var(--brand-accent)_100%)] animate-[spin_1.5s_linear_infinite] blur-[2px]" />
        
        {/* The sharp inner gradient that spins */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_40%,var(--brand-primary)_80%,var(--brand-accent)_100%)] animate-[spin_1.5s_linear_infinite]" />

        {/* The mask that punches out the middle, creating the "ring" effect */}
        <div className="absolute inset-1 rounded-full bg-bg-surface backdrop-blur-xl z-10" />

        {/* A subtle inner pulse effect inside the ring */}
        <div className="absolute inset-6 rounded-full bg-brand-accent/20 animate-ping blur-md z-20" />
      </div>

      {/* 2. THE ANIMATED TEXT */}
      <div className="flex flex-col items-center">
        {/* The text has a gradient and a slow pulse */}
        <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary animate-pulse tracking-wide">
          {text}
        </p>
        
        {/* Three bouncing dots for a premium "loading" feel */}
        <div className="flex gap-1.5 mt-3">
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-brand-accent/70 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
      
    </div>
  );
}