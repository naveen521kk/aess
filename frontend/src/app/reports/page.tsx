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
import { RubricResponse } from "@/lib/types";
import { getLlmFeedback } from "@/lib/api";
import { toast } from "sonner";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader2 } from "lucide-react";
import { auth } from "@/firebase";

export default function Example() {
  const [user, loading, error] = useAuthState(auth);
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
          <ScrollArea className="h-[100vh] w-full">
            <DisplayEssay essay={essay} uid={user.uid} />
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
