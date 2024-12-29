"use client";

import liff from "@line/liff";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LiffContextType {
  liffObject: any;
  liffError: any;
}

const LiffContext = createContext<LiffContextType | undefined>(undefined);

export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [liffError, setLiffError] = useState(null);

  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID as string })
      .then(() => {
        console.log("liff initialization is done");
        setLiffObject(liff);
      })
      .catch((error: any) => {
        console.log(`liff initialization failed: ${error}`);
        setLiffError(error.toString());
      });
  }, []);

  return (
    <LiffContext.Provider value={{ liffObject, liffError }}>
      {children}
    </LiffContext.Provider>
  );
};

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error("useLiff must be used within a LiffProvider");
  }
  return context;
};
