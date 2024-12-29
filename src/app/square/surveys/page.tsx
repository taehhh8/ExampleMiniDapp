export const dynamic = "force-dynamic";

import React from "react";
import SurveyCard from "../../../components/SurveyCard";
import { getAllSurveyV1s } from "../../../hooks/backend/survey";

export const metadata = {
  title: "Surveys",
};

const surveys = [
  {
    title: "Customer Feedback",
    desc: "Gather valuable feedback from your customers to improve your product. Reward participants with a small token of appreciation. Minimum reward is 0.2 KAIA.",
    id: "2",
    remaining: 50,
    reward: "0.2",
    respondents: 20,
    daysleft: 4,
    finished: false,
  },
  {
    title: "Market Research Survey",
    desc: "Conduct market research to analyze trends and user preferences. Participants will receive rewards starting at 0.5 KAIA.",
    id: "3",
    remaining: 30,
    reward: "0.5",
    respondents: 25,
    daysleft: 2,
    finished: false,
  },
  {
    title: "Employee Satisfaction Survey",
    desc: "Help us improve workplace conditions by providing your honest feedback. Minimum reward is 0.3 KAIA.",
    id: "4",
    remaining: 80,
    reward: "0.3",
    respondents: 10,
    daysleft: 4,
    finished: false,
  },
  {
    title: "Community Opinion Poll",
    desc: "Share your opinions about local community issues and be rewarded for your insights. Rewards start at 0.1 KAIA.",
    id: "5",
    remaining: 100,
    reward: "0.1",
    respondents: 50,
    daysleft: 4,
    finished: false,
  },
  {
    title: "Product Usability Test",
    desc: "Participate in a usability test for our new product. Your feedback will help shape future improvements. Rewards are 0.4 KAIA per participant.",
    id: "6",
    remaining: 60,
    reward: "0.4",
    respondents: 15,
    daysleft: 4,
    finished: false,
  },
  {
    title: "Environmental Awareness Survey",
    desc: "Help us understand public opinion on environmental issues. Participants will earn 0.2 KAIA for completing the survey.",
    id: "7",
    remaining: 90,
    reward: "0.2",
    respondents: 12,
    daysleft: 4,
    finished: false,
  },
  {
    title: "App Feature Feedback",
    desc: "Give us your thoughts on new app features. Rewards start at 0.3 KAIA.",
    id: "8",
    remaining: 40,
    reward: "0.3",
    respondents: 18,
    daysleft: 4,
    finished: false,
  },
  {
    title: "Education Improvement Survey",
    desc: "Share your views on how to improve educational programs. Participants are rewarded 0.25 KAIA.",
    id: "9",
    remaining: 75,
    reward: "0.25",
    respondents: 30,
    daysleft: 4,
    finished: false,
  },
  {
    title: "Healthcare Access Survey",
    desc: "Your opinions on healthcare access are important to us. Reward: 0.5 KAIA per participant.",
    id: "10",
    remaining: 20,
    reward: "0.5",
    respondents: 8,
    daysleft: 4,
    finished: true,
  },
  {
    title: "E-commerce User Experience Survey",
    desc: "Help us enhance our e-commerce platform. Complete the survey to earn 0.35 KAIA.",
    id: "11",
    remaining: 60,
    reward: "0.35",
    respondents: 14,
    daysleft: 4,
    finished: false,
  },
];

export default async function SurveysPage() {
  const data = await getAllSurveyV1s();
  return (
    <div className="flex flex-col">
      <h1 className="flex flex-col items-center text-3xl font-bold font-serif text-red-500 mx-5">
        Hot Topics
      </h1>
      <div className="flex min-h-80 gap-5 overflow-x-scroll my-5 scrollbar-hide">
        {surveys.map((survey) => (
          <SurveyCard
            key={survey.id}
            title={survey.title}
            desc={survey.desc}
            id={survey.id}
            remaining={survey.remaining}
            reward={survey.reward}
            repondents={survey.respondents}
            daysLeft={survey.daysleft}
            finished={survey.finished}
          />
        ))}
      </div>
      <h1 className="flex flex-col items-center text-3xl font-bold font-serif text-violet-800 mx-5 mt-8">
        Surveys
      </h1>
      <div className="flex flex-wrap gap-5 justify-center mt-5 mb-10">
        {data.map((survey) => (
          <SurveyCard
            key={survey.id}
            title={survey.title}
            desc={survey.desc}
            id={survey.id}
            remaining={survey.remaining}
            reward={survey.reward}
            repondents={survey.respondents}
            daysLeft={survey.daysleft}
            finished={survey.finished}
          />
        ))}
      </div>
    </div>
  );
}
