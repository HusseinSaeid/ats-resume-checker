"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePuterStore } from "@/lib/puter";

export default function AuthGuard() {
  const { auth } = usePuterStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/auth?next=/");
    }
  }, [auth.isAuthenticated, router]);

  return null;
}
