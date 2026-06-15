import { LoaderPinwheel } from "lucide-react";

export default function LoadingSpinner({ text = "Loading...", size = 48 }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderPinwheel
        size={size}
        className="animate-spin text-blue-600"
        strokeWidth={2}
      />
      <span className="ml-3 text-lg text-gray-700">{text}</span>
    </div>
  );
}
