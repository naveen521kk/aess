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

export function ViewFeedback({ feedback }: { feedback: string }) {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full" variant="secondary">
            View Feedback
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Feedback</DrawerTitle>
              <DrawerDescription>
                Here is some feedback about your essay
              </DrawerDescription>
            </DrawerHeader>
            <div className="mx-4 mb-6">{feedback}</div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
