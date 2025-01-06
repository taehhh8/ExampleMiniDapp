"use client";

import React from "react";
import { Question } from "../types/index.ts";
import { useWeb3 } from "../context/Web3Provider.tsx";
import { submitAnswer } from "../hooks/browser/survey.tsx";
import { useRouter } from "next/navigation.js";
import { Group } from "@semaphore-protocol/group";
import { generateProof } from "@semaphore-protocol/proof";

export default function SubmitAnswerForm({
  id,
  questions,
}: {
  id: string;
  questions: Question[];
}) {
  const { provider, identity } = useWeb3();
  const router = useRouter();

  const getGroup = async (id: string) => {
    const result = await fetch("/api/join", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const members = await result.json();
    return new Group(members);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) {
      alert("Please connect the wallet first!");
      return;
    }
    if (!identity) {
      alert("You need to login with LINE if you want to submit the answer");
      return;
    }
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const signer = await provider.getSigner();
    const ans = Array.from(formData.values()).map((val) =>
      parseInt(val as string)
    );
    const group = await getGroup(id);
    const proof = await generateProof(
      identity,
      group,
      new Uint8Array(ans),
      group.root
    );
    const answer = {
      respondent: signer.address,
      answers: ans,
      merkleTreeDepth: proof.merkleTreeDepth,
      merkleTreeRoot: proof.merkleTreeRoot,
      nullifier: proof.nullifier,
      points: proof.points,
    };
    const receipt = await submitAnswer(id, provider, answer);
    if (receipt.status) {
      alert("Successfully submitted!");
      router.push(`/square/surveys/${id}`);
    } else {
      alert("Failed to submit");
    }
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
