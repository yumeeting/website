import { DotIcon, EllipsisIcon, PenLineIcon, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { readableTime } from "@/modules/readableTime";
import { Recording } from "./types/Recording";

export function RecordingsList({
  recordings,
  setRecordings: _setRecordings,
  handleListState,
  handleSelectedRecordingId,
}: {
  recordings: Recording[];
  setRecordings: Dispatch<SetStateAction<Recording[]>>;
  handleListState?: (listOpened: boolean) => void;
  handleSelectedRecordingId?: (recordingId: string) => void;
}) {
  const [selectedRecordingId, setSelectedRecordingId] = useState<string>("");
  const [listOpened, setListOpened] = useState(false);

  if (handleSelectedRecordingId) {
    useEffect(() => {
      handleSelectedRecordingId(selectedRecordingId);
    }, [selectedRecordingId, handleSelectedRecordingId]);
  }

  if (handleListState) {
    useEffect(() => {
      handleListState(listOpened);
    }, [listOpened, handleListState]);
  }

  useEffect(() => {
    if (!listOpened) {
      setSelectedRecordingId("");
    }
  }, [listOpened]);

  return (
    <div
      className={cn(
        "flex flex-col bg-primary rounded-md gap-2 px-3 sm:px-5 py-3 sm:py-4 transition-[flex-grow] duration-300",
        listOpened && selectedRecordingId && "flex-grow",
      )}
    >
      <Accordion
        type="single"
        collapsible
        className="text-white w-full"
        onValueChange={(item) => setListOpened(item === "recordings")}
      >
        <AccordionItem value="recordings" className="border-b-0">
          <AccordionTrigger className="p-0">展開會議紀錄</AccordionTrigger>
          <AccordionContent className="p-0" />
          <RadioGroup
            value={selectedRecordingId}
            onValueChange={(recordingId) => setSelectedRecordingId(recordingId)}
          >
            {recordings.map((recording, index) => (
              <AccordionContent
                key={recording.id}
                className={cn("p-0", index === 0 ? "mt-4" : "pt-0")}
              >
                <RadioGroupItem
                  value={recording.id}
                  id={recording.id}
                  className="hidden"
                />
                <Label
                  htmlFor={recording.id}
                  className={cn(
                    "flex items-center justify-between gap-4 hover:bg-[#383838] transition-colors duration-200 cursor-pointer px-2 pb-1.5 rounded-lg",
                    selectedRecordingId === recording.id && "bg-[#383838]",
                  )}
                >
                  <div className="flex-grow min-w-0">
                    <p className="flex items-center text-xs text-muted-foreground">
                      {
                        readableTime.formatElapsedTime(recording.durationMs)
                          .string
                      }
                      <DotIcon className="-mx-1.5 translate-y-[1px]" />
                      {new Date(recording.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-base sm:text-lg text-ellipsis overflow-hidden whitespace-nowrap">
                      {recording.title}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="-mb-1.5 px-1.5 aspect-square rounded-xl hover:bg-primary transition-colors duration-200">
                      <EllipsisIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#383838] border border-primary text-white">
                      <DropdownMenuItem className="cursor-pointer hover:!bg-primary/70 hover:!text-primary-foreground">
                        <TrashIcon />
                        刪除
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:!bg-primary/70 hover:!text-primary-foreground">
                        <PenLineIcon />
                        重命名
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Label>
              </AccordionContent>
            ))}
          </RadioGroup>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
