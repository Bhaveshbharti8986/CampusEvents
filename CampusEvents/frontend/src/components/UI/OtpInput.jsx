import { useState } from "react";

export default function OtpInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  return (
    <div className="flex space-x-2 justify-center">
      {otp.map((digit, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          className="w-10 h-10 text-center border rounded focus:ring focus:ring-blue-300"
        />
      ))}
    </div>
  );
}
