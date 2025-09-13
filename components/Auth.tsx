"use client";
import { usePuterStore } from "@/lib/puter";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div>
      {isLoading ? (
        <button className="auth-button animate-pulse">
          <p>Signing you in...</p>
        </button>
      ) : (
        <>
          {auth.isAuthenticated ? (
            <button className="auth-button" onClick={() => auth.signOut()}>
              <p>Sign Out</p>
            </button>
          ) : (
            <button className="auth-button" onClick={() => auth.signIn()}>
              <p>Sign In</p>
            </button>
          )}
        </>
      )}
    </div>
  );
}
