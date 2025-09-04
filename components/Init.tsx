"use client";
import { useEffect } from "react";
import { usePuterStore } from "@/lib/puter";
export default function Init() {
  const { init } = usePuterStore();
  useEffect(() => {
    init();
  }, [init]);
}
