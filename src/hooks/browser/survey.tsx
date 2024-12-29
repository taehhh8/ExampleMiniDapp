import surveyAbi from "../../contracts/SurveyV1.sol/SurveyV1.json";
import { ethers } from "ethers";
import { Answer } from "../../types";
import { Identity } from "@semaphore-protocol/core";
import { liff } from "@line/liff";
import { Web3Provider } from "@kaiachain/ethers-ext/v6";

const getSurveyV1 = (surveyAddress: string, signer: ethers.JsonRpcSigner) =>
  new ethers.Contract(surveyAddress, surveyAbi.abi, signer);

export const submitAnswer = async (
  surveyAddress: string,
  provider: ethers.BrowserProvider,
  answer: Answer
) => {
  const survey = getSurveyV1(surveyAddress, await provider.getSigner(0));
  try {
    const tx = await survey.submitAnswer(answer);
    const receipt = await tx.wait();
    return receipt;
  } catch (e: any) {
    console.error(e);
    return e.message;
  }
};

export const createIdentity = async (
  web3: Web3Provider,
  address: string,
  liffObject: liff
) => {
  try {
    const idToken = liffObject.getDecodedIDToken();
    const uid = idToken.sub;
    const msg = "hello destat" + uid + address;
    const hexMsg = ethers.hexlify(ethers.toUtf8Bytes(msg));
    const secret = await web3.send("kaia_signLegacy", [address, hexMsg]);
    return new Identity(secret);
  } catch (error) {
    console.log("error", error);
    throw Error("Failed to create identity");
  }
};
