"use client";

import React from "react";
import { Identity, Group, generateProof } from "@semaphore-protocol/core";
import { useWeb3 } from "../context/Web3Provider";
import { useLiff } from "../context/LiffProvider";
import { TxType, parseKaia } from "@kaiachain/js-ext-core";
import { ethers } from "ethers";
import { jwtDecode } from "jwt-decode";
import { createIdentity } from "../hooks/browser/survey";
import { joinGroup } from "../hooks/backend/survey";

export default function Page() {
  const web3 = useWeb3();
  const { liffObject, liffError } = useLiff();

  const fdSignRequest = async () => {
    if (!web3.provider) {
      alert("kaia wallet is not installed!");
      return;
    }
    console.log("start fd sign request");
    const tx = {
      typeInt: 9,
      // type: TxType.FeeDelegatedValueTransfer,
      from: web3.account,
      to: web3.account,
      value: "0x10",
      feePayer: web3.account,
      // value: parseKaia("0.1").toBigInt(),
    };
    const signedTx = await web3.provider?.request({
      // method: "kaia_sendTransaction",
      method: "kaia_signTransaction",
      params: [tx],
    });

    // const signedTx = await (
    //   await web3.provider.getSigner(0)
    // ).signTransaction(tx);
    console.log("signedTx", signedTx);
  };

  const createId = async (): Identity => {
    try {
      if (!web3.provider || !web3.account) {
        alert("The wallet is not connected yet!");
        return;
      }
      const identity = await createIdentity(
        web3.provider,
        web3.account,
        liffObject
      );
      console.log("identity", identity);
      return identity;
    } catch (error) {
      console.log("error", error);
      throw Error("Failed to create identity");
    }
  };

  const joinGrp = async () => {
    const id = await createId();
    // await joinGroup(
    //   "0x0",
    //   id.commitment,
    //   id.privateKey,
    //   "idToken",
    //   web3.account
    // );
  };

  const submitSurvey = async () => {
    const identity1 = new Identity();
    const identity2 = new Identity();
    const identity3 = new Identity();
    const group = new Group([
      identity1.commitment,
      identity2.commitment,
      identity3.commitment,
    ]);
    const message = Uint8Array.from([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ]);
    const proof = await generateProof(identity1, group, message, group.root);
    console.log("proof", proof);
    console.log(ethers.toBigInt(message));
    console.log(ethers.toBigInt(message));
  };

  const login = async () => {
    // console.log(liffError);
    // const result = await liffObject.login();
    // const profile = JSON.stringify(await liffObject.getProfile());
    // console.log("profile", profile);
    // test(liffObject);
  };

  return (
    <div className="flex flex-col gap-5">
      <button className="bg-slate-50 w-40" onClick={createId}>
        create identity
      </button>
      <button className="bg-slate-50 w-40" onClick={joinGrp}>
        join group
      </button>
      <button className="bg-slate-50 w-40" onClick={submitSurvey}>
        submit survey
      </button>
      <button className="bg-slate-50 w-40" onClick={fdSignRequest}>
        sign fd tx
      </button>
      <button className="bg-slate-50 w-40" onClick={login}>
        liff login
      </button>
    </div>
  );
}
