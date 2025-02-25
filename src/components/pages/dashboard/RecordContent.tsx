import { motion } from "motion/react";
import { createRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DotIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Record } from "@/components/pages/dashboard/types/Record";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { readableTime } from "@/modules/readableTime";

export function RecordContent({
  record,
  selectedRecordId,
}: {
  record: Record[];
  selectedRecordId: string;
}) {
  return (
    <>
      <div
        className={cn(
          "h-full max-w-7xl bg-white rounded-lg transition-[width,height,margin] duration-300 overflow-hidden",
          !selectedRecordId && "w-0 h-0 mt-60",
          selectedRecordId && "w-full h-full",
        )}
      >
        <div className="flex flex-col gap-5 w-full h-full p-7">
          <Content selectedRecordId={selectedRecordId} records={record} />
        </div>
      </div>
    </>
  );
}

function Content({
  selectedRecordId: selectedRecordingId,
  records,
}: {
  selectedRecordId: string;
  records: Record[];
}) {
  const [selectedContentType, setSelectedContentType] = useState<
    "notes" | "transcript"
  >("notes");
  const syntaxHighlighterRef = createRef<SyntaxHighlighter>();

  const selectedRecord = records.find(
    (recording) => recording.id === selectedRecordingId,
  );

  if (!selectedRecord) {
    return <h1>請選擇一個會議記錄</h1>;
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">{selectedRecord.title}</h1>
        <p className="mt-2 flex items-center text-xs text-muted-foreground">
          {readableTime.formatElapsedTime(selectedRecord.durationMs).string}
          <DotIcon className="-mx-1.5 translate-y-[1px]" />
          {new Date(selectedRecord.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-3 xl:gap-6 flex-col xl:flex-row justify-between">
        <AudioPlayer
          audioSourcePath={selectedRecord.audioSourcePath}
          className="max-w-sm w-full"
        />
        <div className="flex gap-3">
          <div className="p-1 flex gap-1 bg-background rounded-full">
            <Button
              variant="ghost"
              className={cn(
                "rounded-full p-0 w-20 h-full",
                selectedContentType === "notes" && "!bg-white",
              )}
              onClick={() => setSelectedContentType("notes")}
            >
              會議紀錄
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "rounded-full p-0 w-20 h-full",
                selectedContentType === "transcript" && "!bg-white",
              )}
              onClick={() => setSelectedContentType("transcript")}
            >
              逐字稿
            </Button>
          </div>
          <Button className="rounded-full">下載錄音</Button>
          <Button className="rounded-full">下載會議整理</Button>
        </div>
      </div>
      <Separator />
      <div className="flex-grow relative [&_a]:text-blue-500 max-w-full overflow-y-auto overflow-x-hidden light-scrollbar">
        <motion.div
          animate={selectedContentType === "notes" ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              display: "block",
              x: "0%",
            },
            closed: {
              opacity: 0,
              display: "none",
              x: "-100%",
            },
          }}
          transition={{
            x: { type: "spring", bounce: 0, duration: 0.3 },
            opacity: { duration: 0.3 },
          }}
          className="absolute top-0 left-0 bottom-0 right-1.5 prose"
        >
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
            {selectedRecord.notes}
          </Markdown>
        </motion.div>
        <motion.div
          animate={selectedContentType === "transcript" ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              display: "block",
              x: "0%",
            },
            closed: {
              opacity: 0,
              display: "none",
              x: "100%",
            },
          }}
          transition={{
            x: { type: "spring", bounce: 0, duration: 0.3 },
            opacity: { duration: 0.3 },
          }}
          className="absolute top-0 left-0 bottom-0 right-1.5"
        >
          <div className="flex flex-col gap-3">
            {selectedRecord.transcripts.map((transcript, index) => (
              <div key={index} className="px-4 py-4 bg-stone-100 rounded-lg">
                <p className="text-sm flex items-center">
                  <span className="font-semibold">{transcript.userName}</span>
                  <span className="ml-2 text-muted-foreground">
                    {
                      readableTime.formatElapsedTime(transcript.startTime)
                        .string
                    }
                  </span>
                </p>
                <p>{transcript.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
