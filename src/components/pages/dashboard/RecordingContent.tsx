import { motion } from "motion/react";
import { createRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Recording } from "@/components/pages/dashboard/types/Recording";
import { Separator } from "@/components/ui/separator";

export function RecordingContent({
  recordings,
  selectedRecordingId,
}: {
  recordings: Recording[];
  selectedRecordingId: string;
}) {
  return (
    <>
      <div
        className={cn(
          "h-full max-w-7xl bg-white rounded-lg transition-[width,height,margin] duration-300 overflow-hidden",
          !selectedRecordingId && "w-0 h-0 mt-60",
          selectedRecordingId && "w-full h-full",
        )}
      >
        <motion.div
          animate={selectedRecordingId ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              x: "0%",
            },
            closed: {
              opacity: 0,
              x: "-100%",
            },
          }}
          className="flex flex-col gap-5 w-full h-full p-7"
        >
          <Content selectedRecordingId={selectedRecordingId} />
        </motion.div>
      </div>
    </>
  );

  function Content({
    selectedRecordingId,
  }: {
    selectedRecordingId: string;
  }) {
    const syntaxHighlighterRef = createRef<SyntaxHighlighter>();

    const selectedRecording = recordings.find(
      (recording) => recording.id === selectedRecordingId,
    );

    if (!selectedRecording) {
      return <h1>請選擇一個會議記錄</h1>;
    }

    return (
      <>
        <h1 className="text-3xl font-semibold">{selectedRecording.title}</h1>
        <div className="flex gap-3 xl:gap-6 flex-col xl:flex-row justify-between">
          <AudioPlayer
            audioSourcePath={selectedRecording.audioSourcePath}
            className="max-w-sm w-full"
          />
          <div className="flex gap-3">
            <Button className="rounded-full">下載錄音</Button>
            <Button className="rounded-full">下載會議整理</Button>
            <Button variant="border" className="rounded-full">
              查看逐字稿
            </Button>
          </div>
        </div>
        <Separator />
        <div className="[&_a]:text-blue-500 prose max-w-full overflow-y-auto light-scrollbar pr-3">
          <Markdown
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={oneDark}
                    ref={syntaxHighlighterRef}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {selectedRecording.notes}
          </Markdown>
        </div>
      </>
    );
  }
}
