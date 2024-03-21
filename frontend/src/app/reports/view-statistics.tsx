import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { EssayStats, Readability } from "@/lib/types";

export function ViewEssayStats({ stats }: { stats: EssayStats }) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full" variant="default">
            View Essay Stats
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Essay Statistics</DrawerTitle>
              <DrawerDescription>
                Here are some readability scores for the essay.
              </DrawerDescription>
            </DrawerHeader>
            <ul className="list-disc pb-5 pl-8">
              {stats && (
                <>
                  <li>
                    <span className="font-semibold">
                      Alphanumeric Characters:
                    </span>{" "}
                    {stats.alphanumeric_characters}
                  </li>
                  <li>
                    <span className="font-semibold">Total Characters: </span>
                    {stats.total_characters}
                  </li>
                  <li>
                    <span className="font-semibold">Total Sentences: </span>
                    {stats.total_sentences}
                  </li>
                  <li>
                    <span className="font-semibold">Total Words: </span>{" "}
                    {stats.total_words}
                  </li>
                </>
              )}
            </ul>
            {/* <div className="mx-4 mb-6">{feedback}</div> */}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
