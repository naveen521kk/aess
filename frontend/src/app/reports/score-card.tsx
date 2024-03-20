export function ScoreCard() {
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
          A+
        </div>
      </div>
    </div>
  );
}
