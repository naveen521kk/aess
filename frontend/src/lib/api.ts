"use server";

import { EssayStats, Readability, RubricResponse, Suggestion } from "./types";

export async function getGrammarCheckResult(
  text: string,
  userId: string,
): Promise<Suggestion[]> {
  const searchParams = new URLSearchParams([["userid", userId]]);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/gram_mech_check?${searchParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    },
  );
  if (!response.ok) {
    throw "unknown error";
  }

  const res = await response.json();
  return (res as any)[0];
}

export async function getLlmFeedback(
  text: string,
  userId: string,
): Promise<RubricResponse> {
  const searchParams = new URLSearchParams([["userid", userId]]);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/get_llm_feedback?${searchParams}`,
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
  if (!response.ok) {
    throw res;
  }
  console.log(res);
  return res as any;
}

export async function getReadabilityLevels(
  text: string,
  userId: string,
): Promise<Readability> {
  const searchParams = new URLSearchParams([["userid", userId]]);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/get_readability_levels?${searchParams}`,
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
  if (!response.ok) {
    throw res;
  }
  console.log(res);
  return res as any;
}

export async function getEssayStats(
  text: string,
  userId: string,
): Promise<EssayStats> {
  const searchParams = new URLSearchParams([["userid", userId]]);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/get_essay_stats?${searchParams}`,
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
  if (!response.ok) {
    throw res;
  }
  console.log(res);
  return res as any;
}

export async function autoCompleteEssay(text: string): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auto_complete_essay`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    },
  );
  const res = await response.json();
  if (!response.ok) {
    throw res;
  }
  console.log(res);
  return res as any;
}
