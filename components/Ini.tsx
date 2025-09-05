"use client";
import { useEffect } from "react";
import { usePuterStore } from "@/lib/puter";
export default function Ini() {
  const { init } = usePuterStore();
  useEffect(() => {
    init();
  }, [init]);
}
