import { ReportSectionCard } from "./report-section-card";
import { Separator } from "@/components/ui/separator";
import { ScoreCard } from "./score-card";
import { RubricResponse } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewFeedback } from "./view-feedback";
import { Button } from "@/components/ui/button";
import { ViewSuggestions } from "./view-suggestions";

export function DisplayReportsWithScore({
  essay,
  llmFeedback,
}: {
  essay: string;
  llmFeedback: RubricResponse | null;
}) {
  if (!llmFeedback)
    return (
      <div className="flex h-full w-full flex-col items-center justify-normal space-y-4 p-6">
        <div className="space-y-2">
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
          <Skeleton className="h-12 w-[400px] overflow-clip" />
        </div>
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col items-center justify-normal space-y-4 p-6">
      <div className="w-full">
        <ScoreCard essay={essay} score={llmFeedback.total} />
      </div>
      <div className="flex w-full flex-row space-x-4 rounded-lg border bg-card p-6 text-card-foreground shadow">
        <ViewFeedback feedback={llmFeedback.feedback} />
        <ViewSuggestions suggestions={llmFeedback.suggestions} />
      </div>
      <div className="w-full space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow">
        <div className="w-full ">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
            <p className="text-gray-400 dark:text-gray-400">
              View detailed feedback for each section of your essay.
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row flex-wrap items-center justify-center">
          {llmFeedback.rubrics.map((rubric, index) => (
            <ReportSectionCard
              key={index}
              title={rubric.name}
              feedback={rubric.feedback}
              percentage={(rubric.grade * 100) / 4}
            />
          ))}
        </div>
      </div>
      {/* <div className="w-full">
        <FeedbackCard feedback={llmFeedback.feedback} />
      </div> */}
    </div>
  );
}
