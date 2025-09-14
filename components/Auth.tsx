"use client";
import { usePuterStore } from "@/lib/puter";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSignInAlt, FaSpinner } from "react-icons/fa";

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const searchParams = useSearchParams(); // URLSearchParams object
  const next = searchParams.get("next") || "/"; // default لو مفيش next
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push(next);
    }
  }, [auth.isAuthenticated, next, router]);
  return (
    <div className="w-full">
      {isLoading ? (
        <button className="auth-button-new animate-pulse">
          <FaSpinner className="animate-spin text-xl" />
          <span>Signing you in...</span>
        </button>
      ) : (
        <button className="auth-button-new" onClick={() => auth.signIn()}>
          <FaSignInAlt className="text-xl" />
          <span>Sign In</span>
        </button>
      )}
    </div>
  );
}
