import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <p className="text-lg font-bold text-gradient">Resumix</p>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/upload"
          className="primary-gradient text-center backdrop-blur-md shadow-sm text-white rounded-full
         px-3 py-1.5 text-sm w-full 
         sm:w-auto sm:px-5 sm:py-2 sm:text-base
         font-semibold transition-all duration-300 hover:shadow-lg"
        >
          Upload
        </Link>
        <SignOutButton
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-red-600"
        />
      </div>
    </nav>
  );
}
