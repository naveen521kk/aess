"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DisplayEssay } from "./display-essay";
import { DisplayReportsWithScore } from "./display-reports-with-score";
import { RubricResponse } from "@/lib/types";
import { getLlmFeedback } from "@/lib/api";
import { toast } from "sonner";

export default function Example() {
  const router = useRouter();
  const [essay, setEssay] = React.useState("");
  const [rerenderCount, setRerenderCount] = React.useState(0);
  const [llmFeedback, setLlmFeedback] = React.useState<RubricResponse | null>(
    null,
  );

  // load the essay from local storage
  React.useEffect(() => {
    const essay = localStorage.getItem("essay");
    if (essay) {
      setEssay(essay);
    } else {
      // if there is no essay, redirect to the home page
      router.push("/");
    }
  }, [router]);

  // load the feedback
  React.useEffect(() => {
    const a = async () => {
      if (!essay) return;
      try {
        const data = await getLlmFeedback(essay);
        console.log({ data });
        setLlmFeedback(data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to get feedback", {
          action: {
            label: "Retry",
            onClick: () => {
              setRerenderCount((c) => c + 1);
            },
          },
        });
      }
    };
    a();
  }, [essay, rerenderCount]);

  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] rounded-lg border"
      >
        <ResizablePanel defaultSize={65} order={1}>
          <ScrollArea className="h-[100vh] w-full">
            <DisplayEssay essay={essay} />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={25} order={2} maxSize={50}>
          <ScrollArea className="h-[100vh] w-full">
            <DisplayReportsWithScore essay={essay} llmFeedback={llmFeedback} />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
