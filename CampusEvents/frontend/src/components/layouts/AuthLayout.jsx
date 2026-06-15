export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center  relative ">
      {/* Floating card */}
      <div className=" rounded-lg  ">
        {children}
      </div>
    </div>
  );
}
