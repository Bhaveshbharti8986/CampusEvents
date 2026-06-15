export default function Input({ type = "text", value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded mb-3 focus:ring focus:ring-blue-300"
      required
    />
  );
}
