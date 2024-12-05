"use client";

declare global {
  interface Window {
    klaytn: any;
    ethereum: any;
  }
}

import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  account: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("kaia wallet is not installed!");
        return;
      }
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await web3Provider.send("eth_requestAccounts", []);
      setProvider(web3Provider);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setAccount(null);
    setIsConnected(false);
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
