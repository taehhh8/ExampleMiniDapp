import { ethers } from "ethers";
import { provider } from "../common/provider";
import surveyAbi from "../../../contract/artifacts/contracts/SurveyV1.sol/SurveyV1.json";
import { Answer } from "../../types";

const getSurveyV1 = (surveyAddress: string, signer: ethers.JsonRpcSigner) =>
  new ethers.Contract(surveyAddress, surveyAbi.abi, signer);

export const submitAnswer = async (
  surveyAddress: string,
  provider: ethers.BrowserProvider,
  answer: Answer
) => {
  const survey = getSurveyV1(surveyAddress, await provider.getSigner(0));
  const tx = await survey.submitAnswer(answer);
  const receipt = await tx.wait();
  return receipt;
};
