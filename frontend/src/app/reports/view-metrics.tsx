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
import { Readability } from "@/lib/types";

export function ViewMetrics({ readability }: { readability: Readability }) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full" variant="secondary">
            View Metrics
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Metrics</DrawerTitle>
              <DrawerDescription>
                Here are some readability scores for the essay.
              </DrawerDescription>
            </DrawerHeader>
            <ul className="list-disc pb-5 pl-8">
              {readability && (
                <>
                  <li>
                    <span className="font-semibold">Readability Level:</span>{" "}
                    {readability.readability_level}
                  </li>
                  <li>
                    <span className="font-semibold">Flesch-Kincaid: </span>
                    {readability.flesch_kincaid.toFixed(2)}
                  </li>
                  <li>
                    <span className="font-semibold">Gunning Fog Index: </span>
                    {readability.gunning_fog.toFixed(2)}
                  </li>
                  <li>
                    <span className="font-semibold">Coleman Liau: </span>{" "}
                    {readability.coleman_liau.toFixed(2)}
                  </li>
                  <li>
                    <span className="font-semibold">Smog: </span>{" "}
                    {readability.smog.toFixed(2)}
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
