"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useLiff } from "../../context/LiffProvider";

export default function Page() {
  const { liffObject, loading } = useLiff();
  const params = useParams();
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
    alert(JSON.stringify(params));
    alert("You are invited by friends" + params.encodedUID);
    // invited by friends
    if (params.encodedUID) {
      if (!liffObject || !liffObject.isLoggedIn()) {
        return;
      }
      friends(params.encodedUID as string, liffObject.getIDToken()).then(
        (res) => {
          if (res.error) {
            console.error(res.error);
          }
        }
      );
    }
    router.push("/square/surveys");
  }, [loading]);

  return <div className="flex flex-col gap-5"></div>;
}
