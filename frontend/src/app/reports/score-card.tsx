import React from "react";

export function ScoreCard({ essay, score }: { essay: string; score: number }) {
  const [grade, setGrade] = React.useState("A+");

  React.useEffect(() => {
    // score is from 5 to 20 - map it to grades - A+ to F
    if (score >= 18) {
      setGrade("A+");
    } else if (score >= 16) {
      setGrade("A");
    } else if (score >= 14) {
      setGrade("A-");
    } else if (score >= 12) {
      setGrade("B+");
    } else if (score >= 10) {
      setGrade("B");
    } else if (score >= 8) {
      setGrade("B-");
    } else if (score >= 6) {
      setGrade("C+");
    } else if (score >= 4) {
      setGrade("C");
    } else if (score >= 2) {
      setGrade("C-");
    } else {
      setGrade("D");
    }
  }, [score]);

  return (
    <div className="grid gap-4 rounded-lg border bg-card p-6 text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between space-x-4">
        <div className="flex flex-col items-start">
          <div className="text-xl font-semibold">Grade</div>
          <div className="text-lg text-muted-foreground">
            Your current grade
          </div>
        </div>
        <div className="text-center text-4xl font-bold text-green-500 dark:text-green-400">
          {grade}
        </div>
      </div>
    </div>
  );
}
