import { ethers } from "ethers";
import { provider } from "../common/provider";
import surveyAbi from "../../../contract/artifacts/contracts/SurveyV1.sol/SurveyV1.json";
import { getSurveyV1s } from "./factory";
import { Answer, Question } from "../../types";

const getSurveyV1 = (address: string) =>
  new ethers.Contract(address, surveyAbi.abi, provider);

export const getAllSurveyV1s = async () => {
  const surveyAddresses = await getSurveyV1s();
  const surveys = surveyAddresses.map(async (address: string) => {
    const survey = getSurveyV1(address);
    const info = await survey.surveyInfo();
    return info;
  });
  const rlp = await Promise.all(surveys);
  return rlp.map((info) => {
    return decodeSurveyInfo(info, surveyAddresses[rlp.indexOf(info)]);
  });
};

export const getSurvey = async (address: string) => {
  const survey = getSurveyV1(address);
  const info = await survey.surveyInfo();
  return decodeSurveyInfo(info, address);
};

export const getSurveyQuestions = async (address: string) => {
  const survey = getSurveyV1(address);
  const questions = await survey.getQuestions();
  return questions.map((question: any) => {
    return decodeQuestion(question);
  });
};

export const getAnswers = async (address: string) => {
  const survey = getSurveyV1(address);
  const answers = await survey.getAnswers();
  return answers.map((answer: any) => {
    return decodeAnswer(answer);
  });
};

export const countAnswers = async (address: string, questions: Question[]) => {
  const answers = await getAnswers(address);
  const answerCnt: number[][] = Array.from({ length: questions.length }, () =>
    new Array(questions[0].options.length).fill(0)
  );
  answers.map((answer: Answer) => {
    answer.answers.map((ans: number, i: number) => {
      answerCnt[i][ans] += 1;
    });
  });
  return answerCnt;
};

const decodeQuestion = (question: any) => {
  return {
    question: question[0],
    options: question[1],
  };
};

const decodeAnswer = (answer: any) => {
  return {
    respondent: answer[0],
    commit: answer[1],
    answers: answer[2],
  };
};

const decodeSurveyInfo = (info: any[], contractAddr: string) => {
  return {
    title: info[0],
    desc: info[1],
    id: contractAddr,
    remaining: remainedSurvey(info[4], info[5]),
    reward: ethers.formatEther(info[3]),
    respondents: info[5],
    daysleft: daysLeft(info[7]),
    finished: info[10],
  };
};

const remainedSurvey = (targetNumber: number, respondents: number) => {
  return targetNumber - respondents;
};

const daysLeft = (duration: bigint) => {
  const now = BigInt(Math.floor(Date.now() / 1000));
  return Number(duration - now) / 86400;
};
