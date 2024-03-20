import { cn } from "@/lib/utils";
import { ProgressBarCircle } from "./progress-bar-circle";

export function ReportSectionCard({
  title,
  description,
  percentage,
}: {
  title: string;
  description: string;
  percentage: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col items-start justify-center space-y-0 pb-2">
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="mx-8">
        <ProgressBarCircle progress={percentage} />
      </div>
    </div>
  );
}
