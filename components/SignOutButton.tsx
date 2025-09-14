"use client";
import { usePuterStore } from "@/lib/puter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { useToast } from "./Toast";

interface SignOutButtonProps {
  className?: string;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function SignOutButton({
  className = "",
  showIcon = true,
  variant = "primary",
  size = "md",
}: SignOutButtonProps) {
  const { auth, isLoading } = usePuterStore();
  const router = useRouter();
  const { addToast, ToastContainer } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    try {
      await auth.signOut();
      addToast("Successfully signed out", "success", 3000);
      // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تسجيل الخروج
      setTimeout(() => router.push("/auth"), 1000);
    } catch {
      addToast("An error occurred while signing out", "error", 5000);
    } finally {
      setIsSigningOut(false);
    }
  };

  // لا تظهر الزر إذا لم يكن المستخدم مسجل دخول
  if (!auth.isAuthenticated) {
    return null;
  }

  const baseClasses =
    "flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-xl",
    lg: "px-6 py-3 text-lg rounded-2xl",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 focus:ring-gray-500",
    ghost:
      "text-gray-600 hover:text-red-600 hover:bg-red-50 focus:ring-red-500",
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <>
      <button
        onClick={handleSignOut}
        disabled={isLoading || isSigningOut}
        className={buttonClasses}
        title="Sign Out"
      >
        {showIcon &&
          (isLoading || isSigningOut ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaSignOutAlt />
          ))}
        <span>{isLoading || isSigningOut ? "Signing Out..." : "Sign Out"}</span>
      </button>
      <ToastContainer />
    </>
  );
}
