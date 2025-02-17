"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useLiff } from "../../context/LiffProvider";

export default function Page() {
  const { liffObject, loading } = useLiff();
  const router = useRouter();

  const friends = async (encodedUID: string, idToken: string) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/invite/friends`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encodedUID, idToken }),
      }
    ).then((res) => res.json());
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    router.push("/square/surveys");
  }, [loading]);

  return <div className="flex flex-col gap-5"></div>;
}
