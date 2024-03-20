import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center container space-y-4 my-5 lg:my-0">
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
      <div className="w-full flex flex-row space-x-3">
        <Button className="w-full">Submit</Button>
        <Button className="w-full" variant="outline">
          Upload File
        </Button>
      </div>
    </main>
  );
}
