"use client";
import { getGrammarCheckResult } from "@/lib/api";
import { Suggestion } from "@/lib/types";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// a function to split the essay into parts
function findParts(essay: string, suggestions: Suggestion[]) {
  // split the essay into parts, based on the suggestions
  // and mark the parts that are suggested
  let parts: {
    value: string;
    suggested: boolean;
    suggestion?: Suggestion;
  }[] = [];
  let last = 0;
  suggestions.forEach((suggestion) => {
    const [start, end] = suggestion.location;
    parts.push({ value: essay.slice(last, start), suggested: false });
    parts.push({ value: essay.slice(start, end), suggested: true, suggestion });
    last = end;
  });
  parts.push({ value: essay.slice(last), suggested: false });
  return parts;
}

// a function to process the suggestions and display them
function processSuggestions(essay: string, suggestions: Suggestion[]) {
  const parts = findParts(essay, suggestions);
  return (
    <>
      {parts.map((part, index) => {
        if (part.suggested) {
          return (
            <Popover key={index}>
              <PopoverTrigger>
                <span className="highlight">{part.value}</span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="m-2">
                  <p>{part.suggestion!.message}</p>
                  <span className="text-sm font-semibold">Suggestions:</span>
                  <ul className="list-disc pl-5 text-sm">
                    {part.suggestion!.suggestion.map((replacement, index) => (
                      <li key={index}>{replacement}</li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          );
        }
        return <React.Fragment key={index}>{part.value}</React.Fragment>;
      })}
    </>
  );
}

export function DisplayEssay({ essay, uid }: { essay: string; uid: string }) {
  const [suggestions, setSuggestions] = React.useState<Suggestion[] | null>(
    null,
  );

  React.useEffect(() => {
    // fetch the suggestion from the server
    const a = async () => {
      if (!essay) return;

      const res = await getGrammarCheckResult(essay, uid);
      setSuggestions(res);
    };
    a();
  }, [essay, uid]);

  if (!essay) return null;
  console.log({ suggestions });
  return (
    <>
      <div className="flex h-full items-start justify-center p-14">
        <div className="text-2xl leading-10">
          <div className="editor" spellCheck="false">
            {processSuggestions(essay, suggestions || [])}
            {/* {suggestions &&
              suggestions.map((item, index) => {
                console.log({ item, suggestions });
                const beforeHighlight = essay.slice(0, item.location[0]);
                const highlight = essay.slice(
                  item.location[0],
                  item.location[1],
                );
                const afterHighlight = essay.slice(item.location[1]);

                return (
                  <p key={index}>
                    {beforeHighlight}
                    <Popover>
                      <PopoverTrigger>
                        <span className="highlight">{highlight}</span>
                      </PopoverTrigger>
                      <PopoverContent>
                        {
                          <div className="m-2">
                            <p>{item.message}</p>
                            <span className="text-sm font-semibold">
                              Suggestions:
                            </span>
                            <ul className="list-disc pl-5 text-sm">
                              {item.suggestion.map((replacement, index) => (
                                <li key={index}>{replacement}</li>
                              ))}
                            </ul>
                          </div>
                        }
                      </PopoverContent>
                    </Popover>
                    {afterHighlight}
                  </p>
                );
              })}
            {suggestions && suggestions.length === 0 && <p>{essay}</p>} */}
            {/* {essay.split("").map((letter, index) => {
              if (suggestions) {
                // within the location of the suggestion
                const suggestion = suggestions.find((s) => {
                  // if (!s.location) return false;
                  return s.location[0] <= index && s.location[1] >= index;
                });
                if (suggestion) {
                  return (
                    <span
                      key={index}
                      className="bg-red-200"
                      title={suggestion.message}
                    >
                      {letter}
                    </span>
                  );
                }
                return <React.Fragment key={index}>{letter}</React.Fragment>;
              }
              return <React.Fragment key={index}>{letter}</React.Fragment>;
            })} */}
          </div>
        </div>
      </div>
    </>
  );
}
