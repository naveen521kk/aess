"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

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
    <main className="container my-5 flex min-h-screen flex-col items-center justify-center space-y-4 lg:my-0">
      <div className="w-full space-y-2">
        {/* <Label htmlFor="essay" className="font-semibold text-2xl text-center">
          Essay Validator
        </Label> */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Paste your essay
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Get detailed feedback on your writing.
          </p>
        </div>
        <Textarea
          id="essay"
          className="min-h-[70vh] text-lg"
          placeholder="Paste your essay here."
        />
      </div>
      <div className="flex w-full flex-row space-x-3">
        <Button className="w-full">Submit</Button>
        <Button className="w-full" variant="outline">
          Upload File
        </Button>
      </div>
    </main>
  );
}
