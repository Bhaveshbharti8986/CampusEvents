import React, { useState, useRef } from 'react';

function OtpInput({ setOtp, length = 6 }) {
  // Keeps track of the 6 individual box values
  const [otpValues, setOtpValues] = useState(new Array(length).fill(""));
  // Creates references to the physical HTML inputs to control the cursor
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Prevent user from typing letters
    if (isNaN(value)) return;

    const newOtp = [...otpValues];
    // If they type fast, only take the newest character
    newOtp[index] = value.substring(value.length - 1);
    setOtpValues(newOtp);
    
    // Send the combined 6-digit string back to your parent page
    setOtp(newOtp.join(""));

    // AUTO-ADVANCE: If they entered a number and aren't on the last box, move right
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // AUTO-REWIND: If they press backspace on an empty box, move left
    if (e.key === "Backspace" && !otpValues[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    // Strip out letters/symbols and slice to 6 digits max
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    
    if (pasteData) {
      const newOtp = [...otpValues];
      pasteData.split("").forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtpValues(newOtp);
      setOtp(newOtp.join(""));

      // Move the cursor to the end of the pasted string
      const focusIndex = Math.min(pasteData.length, length - 1);
      inputRefs.current[focusIndex].focus();
    }
  };

  return (
    <div className="flex gap-2 w-full justify-center">
      {otpValues.map((value, index) => (
        <input
          key={index}
          // Attach the reference to this specific box
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          /* YOUR EXACT CSS STYLING BELOW */
          className="w-10 h-10 text-white font-semibold text-lg text-center bg-black/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-inner transition-all duration-300 hover:border-white/20 hover:bg-black/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] focus:outline-none focus:border-brand-accent focus:bg-black/40 focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          required
        />
      ))}
    </div>
  );
}

export default OtpInput;