"use client";

import liff from "@line/liff";
import { type LiffMessage } from "@liff/send-messages/lib/type";
import DappPortalSDK from "@linenext/dapp-portal-sdk";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { inviteMessages } from "../messages";

interface LiffContextType {
  liffObject: any;
  liffError: any;
  dappPortalSDK: DappPortalSDK | null;
  inviteFriends: () => void;
  loading: boolean;
}

const LiffContext = createContext<LiffContextType | undefined>(undefined);

export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [liffError, setLiffError] = useState(null);
  const [dappPortalSDK, setDappPortalSDK] = useState<DappPortalSDK | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const locale = params.locale as keyof typeof inviteMessages;

  const initDappPortalSDK = async () => {
    const sdk = await DappPortalSDK.init({
      clientId: process.env.NEXT_PUBLIC_DAPP_PORTAL_CLIENT_ID as string,
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    });
    setDappPortalSDK(sdk);
  };

  const getFlexMessage = (locale: string): LiffMessage => {
    const message = inviteMessages[locale] || inviteMessages["en"];
    return {
      type: "flex",
      altText: message.altText,
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://cyqrsixkgnoiflgq.public.blob.vercel-storage.com/IMG_9055-GNxneDxjn0bwyou8SDKDhRHJD0xoJg.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: message.contentsText1,
              weight: "bold",
              size: "xl",
            },
            {
              type: "text",
              text: message.contentsText2,
              wrap: true,
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              action: {
                type: "uri",
                label: message.footerLabel,
                uri: "https://liff.line.me/2006655154-K808DVbx",
              },
            },
          ],
        },
      },
    };
  };

  const inviteFriends = async () => {
    if (liff && !liff.isLoggedIn()) {
      liff.login();
      return;
    }

    const msg = getFlexMessage(locale);

    if (liff.isApiAvailable("shareTargetPicker")) {
      await liff.shareTargetPicker([msg]);
    } else {
      alert("ShareTargetPicker is not available");
    }
  };

  useEffect(() => {
    liff
      .init({
        liffId: process.env.NEXT_PUBLIC_LIFF_ID as string,
      })
      .then(() => {
        console.log("liff initialization is done");
      })
      .catch((error: any) => {
        console.log(`liff initialization failed: ${error}`);
        setLiffError(error.toString());
      });

    if (!liff.isInClient()) {
      liff
        .init({
          liffId: process.env.NEXT_PUBLIC_LIFF_ID as string,
        })
        .then(() => {
          console.log("liff initialization is done");
        });
    }

    if (liff.isLoggedIn()) {
      setLiffObject(liff);
      initDappPortalSDK().then(() => {
        console.log("miniDappSDK initialization is done");
        setLoading(false);
      });
    }
  }, []);

  return (
    <LiffContext.Provider
      value={{ liffObject, liffError, dappPortalSDK, inviteFriends, loading }}
    >
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
