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
import { Input } from "@/components/ui/input";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [value, setValue] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const router = useRouter();

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
          className="second-bg min-h-[70vh] text-lg shadow-2xl"
          placeholder="Paste your essay here."
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
        >
          Submit
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="secondary">
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
                      console.log("oh yes");
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
                    }
                  }}
                >
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
