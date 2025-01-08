"use client";

import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.location.href = "/square/surveys";
  }, []);

  return <div className="flex flex-col gap-5"></div>;
}
