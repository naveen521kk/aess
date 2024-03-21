"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { autoCompleteEssay } from "@/lib/api";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [value, setValue] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const router = useRouter();
  const [reqLoading, setReqLoading] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [user, loading]);

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
    return <></>;
  }

  return (
    <main className="first-bg container my-5 flex min-h-screen flex-col items-center justify-center space-y-4 lg:my-0">
      <div className="w-full space-y-2">
        {/* <Label htmlFor="essay" className="font-semibold text-2xl text-center">
          Essay Validator
        </Label> */}
        <div className="flex flex-row items-center justify-start space-x-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Paste your essay
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Get detailed feedback on your writing.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={(e) => {
                  if (value.length < 300) {
                    toast.error(
                      "Please enter at least 300 characters to enable autocomplete.",
                    );
                    e.preventDefault();
                  }
                }}
                disabled={reqLoading || value.length < 300}
              >
                {reqLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Complete your essay
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to complete your essay using AI?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will use AI to complete your essay. The use of AI not
                  perfect and could make mistakes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      setReqLoading(true);
                      const res = await autoCompleteEssay(value);
                      setValue(res);
                    } catch (e: any) {
                      console.error(e);
                      toast.error("Failed to autocomplete essay.");
                    }
                    setReqLoading(false);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Textarea
          id="essay"
          className="second-bg min-h-[70vh] text-lg shadow-2xl"
          placeholder="Paste your essay here."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={reqLoading}
        />
      </div>
      <div className="flex w-full flex-row space-x-3">
        <Button
          className="w-full"
          onClick={() => {
            // save the essay to local storage
            localStorage.setItem("essay", value);
            router.push("/reports");
          }}
          disabled={reqLoading}
        >
          {reqLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              variant="secondary"
              disabled={reqLoading}
            >
              {reqLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select File to upload</DialogTitle>
              <DialogDescription>
                You can upload a PDF file or a Word Document.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="file"
                type="file"
                className="col-span-5"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFile(file);
                  }
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={async (e) => {
                    if (file) {
                      try {
                        setReqLoading(true);
                        const formData = new FormData();
                        formData.append("file", file);
                        const response = await fetch(
                          `${process.env.NEXT_PUBLIC_API_BASE_URL}/parse_file`,
                          {
                            method: "POST",
                            body: formData,
                          },
                        );
                        const res = await response.json();

                        setValue(res);
                      } catch (e: any) {
                        console.error(e);
                        toast.error("Failed to upload file. Please try again.");
                      }
                    } else {
                      toast.error("Please select a file to upload.");
                    }
                    setReqLoading(false);
                  }}
                  disabled={reqLoading}
                >
                  {reqLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
