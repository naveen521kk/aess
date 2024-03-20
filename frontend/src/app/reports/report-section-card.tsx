import { cn } from "@/lib/utils";
import { ProgressBarCircle } from "./progress-bar-circle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ReportSectionCard({
  title,
  feedback,
  percentage,
}: {
  title: string;
  feedback: string;
  percentage: number;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full max-w-[10rem] cursor-pointer space-y-2">
          <ProgressBarCircle progress={percentage} />
          <div className="flex flex-col items-center justify-center space-y-0 pb-2 text-center">
            <h3 className="font-medium tracking-tight">{title}</h3>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>{feedback}</PopoverContent>
    </Popover>
  );
}
