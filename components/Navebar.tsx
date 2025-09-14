import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <p className="text-2xl font-bold text-gradient">Resumix</p>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/upload" className="primary-button w-fit">
          Upload Resume
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
