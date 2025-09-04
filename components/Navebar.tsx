import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <p className="text-2xl font-bold text-gradient">Resumix</p>
      </Link>
      <Link href="/upload" className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  );
}
