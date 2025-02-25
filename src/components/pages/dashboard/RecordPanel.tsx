import { MicIcon, UploadIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AudioVisualizer } from "react-audio-visualize";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function RecordPanel({
  recordingsModeSelection,
  setRecordingsModeSelection,
}: {
  recordingsModeSelection: number;
  setRecordingsModeSelection: Dispatch<SetStateAction<number>>;
}) {
  const [isRecording, setIsRecording] = useState(false);

  const recordingsModesOption = [
    "一般會議記錄",
    "一般會議記錄（非常詳細）",
    "上課內容記錄",
    "上課內容記錄（非常詳細）",
    "專案會議記錄",
    "通話記錄",
    "合約會議記錄",
  ];

  return (
    <div className="rounded-lg p-3 sm:p-5 bg-white">
      <div>
        <p className="text-lg font-bold font-outfit">YU Meeting</p>
        <p className="text-xs font-inter mt-2">
          {"By proceeding, you agree to our "}
          <span className="font-semibold underline">Terms of Use</span>
          {"."}
        </p>
      </div>
      <div
        className={cn(
          "relative flex sm:flex-row flex-col gap-3 mt-4 w-full transition-[gap] duration-300 [&_*]:transition-[width,gap,padding,border] [&_*]:duration-300",
          isRecording && "gap-0",
        )}
      >
        <div
          className={cn("flex-grow flex gap-3 h-12", isRecording && "gap-0")}
        >
          <Button
            className="flex-grow h-full rounded-full p-0"
            onClick={() => setIsRecording((prev) => !prev)}
          >
            <MicIcon className="!h-6 !w-auto" />
          </Button>
          <Button
            variant="border"
            className={cn(
              "aspect-square w-12 h-auto rounded-full p-0 overflow-hidden",
              isRecording && "w-0 border-opacity-0 border-0",
            )}
          >
            <UploadIcon className="!h-5 !w-auto" />
          </Button>
        </div>
        <Select>
          <SelectTrigger
            className={cn(
              "w-52 h-12 bg-stone-100 overflow-hidden",
              isRecording && "w-0 p-0 border-opacity-0 border-0",
            )}
          >
            <div>
              <p className="text-xs text-left text-stone-500">模式</p>
              <SelectValue
                placeholder={recordingsModesOption[recordingsModeSelection]}
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            {recordingsModesOption.map((mode, index) => (
              <SelectItem
                key={index}
                value={String(index)}
                className="cursor-pointer"
                onClick={() => setRecordingsModeSelection(index)}
              >
                {mode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator className="mt-3" />
      <Button className="mt-3 h-12 w-full bg-stone-100 hover:bg-stone-200">
        <Icons type="discord" />
        <Icons type="google-meet" />
        <p className="-mt-[2px] text-foreground">使用會議軟體錄製</p>
      </Button>
    </div>
  );
}
