"use client";

import { useEffect } from "react";
import { usePuterStore } from "@/lib/puter";

const Ini: React.FC = () => {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return null; // Component does not render anything
};

export default Ini;
