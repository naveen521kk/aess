import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { ScoreCard } from "./score-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportSectionCard } from "./report-section-card";
import { Separator } from "@/components/ui/separator";

export default function Example() {
  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] rounded-lg border"
      >
        <ResizablePanel defaultSize={75} order={1}>
          <div className="flex h-full items-center justify-center p-6">
            <Textarea
              className="h-full w-full text-xl"
              value={`Education is a very important tool for people worldwide to make the balance of life and its existence on the earth. It is the tool that stimulates everyone to go ahead and succeed in life and provides the ability to overcome challenges in life. It is the only way to acquire knowledge and improve our skills in any field according to the need. It enables us to create a fine balance of our body, mind, and spirit.

It trains us whole life and brings many opportunities to get better prospects required for career growth. Every individual needs proper education to enhance their own life standards and become a part of their country’s social and economic growth. The future of any person or country depends on the education system strategy followed. Even after many awareness programs about proper education in our country, many villages still left that do not have proper resources and awareness for the education of people living there.

Although the condition has improved earlier, the government has taken various steps to improve the education status in the country. Well, the being of the society depends on the well-being of the people in that society. It brings economic and social prosperity throughout the country by solving issues and identifying solutions.`}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={25} order={2}>
          <ScrollArea className="h-[100vh] w-full">
            <div className="flex h-full w-full flex-col items-center justify-normal space-y-4 p-6">
              <div className="w-full">
                <ScoreCard />
              </div>
              <div className="w-full space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow">
                <div className="w-full ">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Reports
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      View detailed feedback for each section of your essay.
                    </p>
                  </div>
                </div>
                <Separator />
                <ReportSectionCard
                  title="Content"
                  description="This is the content for the passage"
                  percentage={60}
                />
                <Separator />
                <ReportSectionCard
                  title="Organization"
                  description="This is the organizatio for the passage"
                  percentage={70}
                />
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
