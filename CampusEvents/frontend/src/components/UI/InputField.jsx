import React from "react";

export default function InputField({ type = "text", value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-black/20 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-xl text-white placeholder:text-text-muted 
      shadow-inner transition-all duration-300 
      hover:border-white/20 hover:bg-black/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
      focus:outline-none focus:border-brand-accent focus:bg-black/40 focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
      required
    />
  );
}