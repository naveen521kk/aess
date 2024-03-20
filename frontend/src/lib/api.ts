"use server";

import { RubricResponse, Suggestion } from "./types";

export async function getGrammarCheckResult(
  text: string,
): Promise<Suggestion[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/gram_mech_check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    },
  );
  const res = await response.json();
  return (res as any)[0];
}

export async function getLlmFeedback(text: string): Promise<RubricResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/get_llm_feedback`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    },
  );
  const res = await response.json();
  if (typeof res === "string") {
    throw "unknown error";
  }
  console.log(res);
  return res as any;
}
