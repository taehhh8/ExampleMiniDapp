import { ethers } from "ethers";
import { provider } from "../common/provider.tsx";
import factoryAbi from "../../contracts/SurveyFactoryV1.sol/SurveyFactoryV1.json";

const factoryV1 = new ethers.Contract(
  process.env.SURVEY_FACTORY_V1_CONTRACT_ADDRESS || "",
  factoryAbi.abi,
  provider
);

export const getSurveyV1s = async () => {
  const surveyAddresses = await factoryV1.getSurveys();
  return surveyAddresses;
};
