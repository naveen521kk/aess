"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DisplayEssay } from "./display-essay";
import { DisplayReportsWithScore } from "./display-reports-with-score";
import { Readability, RubricResponse } from "@/lib/types";
import { getLlmFeedback, getReadabilityLevels } from "@/lib/api";
import { toast } from "sonner";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader2 } from "lucide-react";
import { auth } from "@/firebase";
import { ViewMetrics } from "./view-metrics";
import { ViewSuggestions } from "./view-suggestions";
import { ViewFeedback } from "./view-feedback";

export default function Example() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [essay, setEssay] = React.useState("");
  const [rerenderCount, setRerenderCount] = React.useState(0);
  const [llmFeedback, setLlmFeedback] = React.useState<RubricResponse | null>(
    null,
  );
  const [metrics, setMetrics] = React.useState<Readability | null>(null);

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

  // load the readability metrics
  React.useEffect(() => {
    const a = async () => {
      if (!essay) return;
      if (!user) return;

      try {
        const data = await getReadabilityLevels(essay, user.uid);
        setMetrics(data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to get metrics", {
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
  }, [essay, rerenderCount, user]);

  // load the feedback
  React.useEffect(() => {
    const a = async () => {
      if (!essay) return;
      if (!user) return;
      try {
        const data = await getLlmFeedback(essay, user.uid);
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
  }, [essay, rerenderCount, user]);

  if (loading) {
    return (
      <main className="container flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex min-h-screen items-center justify-center">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  if (!user) {
    redirect("/login");
  }
  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] rounded-lg border"
      >
        <ResizablePanel defaultSize={65} order={1}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={90}>
              <ScrollArea className="h-[100vh] w-full">
                <DisplayEssay essay={essay} uid={user.uid} />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={10}>
              <div className="flex h-full items-center justify-center space-x-4 px-3">
                {llmFeedback && metrics && (
                  <>
                    <ViewMetrics readability={metrics} />
                    <ViewSuggestions suggestions={llmFeedback.suggestions} />
                    <ViewFeedback feedback={llmFeedback.feedback} />
                  </>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
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
