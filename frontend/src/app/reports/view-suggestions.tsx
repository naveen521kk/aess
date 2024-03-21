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

export function ViewSuggestions({ suggestions }: { suggestions: string[] }) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full" variant="default">
            View Suggestions
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Suggestions</DrawerTitle>
              <DrawerDescription>
                Here is some suggestions to improve your essay
              </DrawerDescription>
            </DrawerHeader>
            <div className="mx-4 mb-6">
              <ul className="ml-4 list-disc">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="mb-4">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
