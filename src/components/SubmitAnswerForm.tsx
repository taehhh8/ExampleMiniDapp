"use client";

import React from "react";
import { Question } from "../types";
import { useWeb3 } from "../context/Web3Provider";
import { submitAnswer } from "../hooks/browser/survey";

export default function SubmitAnswerForm({
  id,
  questions,
}: {
  id: string;
  questions: Question[];
}) {
  const { provider } = useWeb3();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const signer = await provider.getSigner();
    const answer = {
      respondent: signer.address,
      commit: "0x1234567890123456789012345678901234567890",
      answers: Array.from(formData.values()).map((val) =>
        parseInt(val as string)
      ),
    };
    const receipt = await submitAnswer(id, provider, answer);
    console.log(receipt);
  };

  return (
    <div className="bg-purple-50 m-3 px-7 py-4 rounded-lg lg:w-3/5 w-80">
      <form onSubmit={submitHandler}>
        <h1 className="font-extrabold text-2xl">Questions</h1>
        {questions.map((question: Question) => (
          <div className="m-3 break-words" key={question.question}>
            <h3 className="font-serif font-semibold mt-2">
              {question.question}
            </h3>
            {question.options.map((option: string, index: number) => (
              <div className="ml-2" key={option}>
                <input
                  name={question.question}
                  type="radio"
                  id={option}
                  value={index}
                />
                <label className="ml-2" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-row justify-end">
          <button className="bg-purple-400 py-2 px-4 rounded-xl" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
