"use client";

import React from "react";
import { useWeb3 } from "../context/Web3Provider.tsx";
import { useLiff } from "../context/LiffProvider.tsx";

export default function Page() {
  const web3 = useWeb3();
  const { liffObject, liffError } = useLiff();

  return <div className="flex flex-col gap-5"></div>;
}
