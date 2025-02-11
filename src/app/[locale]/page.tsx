"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/square/surveys");
  }, []);

  return <div className="flex flex-col gap-5"></div>;
}
