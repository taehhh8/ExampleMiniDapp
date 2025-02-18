"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useLiff } from "../../context/LiffProvider";

export default function Page() {
  const { liffObject, loading } = useLiff();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    router.push("/square/surveys");
  }, [loading]);

  return <div className="flex flex-col gap-5"></div>;
}
