"use client";

import { useUser } from "@auth0/nextjs-auth0";
import {
  DotIcon,
  EllipsisIcon,
  MicIcon,
  PenLineIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { permanentRedirect } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Icons from "@/components/Icons";
import { Spinner } from "@/components/Spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { readableTime } from "@/modules/readableTime";
import { User } from "@auth0/nextjs-auth0/types";
import { AudioPlayer } from "@/components/AudioPlayer";

type Recording = {
  id: string;
  title: string;
  durationMs: number;
  audioSourcePath: string;
  createdAt: number;
};

export default function Dashboard() {
  const { user, isLoading: isAuth0Loading } = useUser();

  const [recordingsModeSelection, setRecordingsModeSelection] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [selectedRecordingId, setSelectedRecordingId] = useState<string>("");
  const [recordings, setRecordings] = useState<Recording[]>([
    {
      id: "1",
      title: "關於多語言海報設計的反饋與建議",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-0.m4a",
      createdAt: Date.now(),
    },
    {
      id: "2",
      title: "增強品牌與產品案例展示及其他項目討論",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-1.m4a",
      createdAt: Date.now() - Math.floor(Math.random() * 11) * 86400000,
    },
    {
      id: "3",
      title: "顧客與店員關於商品維修的詳細對話",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-0.m4a",
      createdAt: Date.now() - Math.floor(Math.random() * 11) * 86400000,
    },
  ]);

  if (isAuth0Loading) {
    return (
      <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
        <Spinner size="large" show={true} />
        <p className="mt-4">Loading YU Meeting Dashboard ...</p>
      </div>
    );
  } else if (!user) {
    permanentRedirect("/login");
  }

  return (
    <>
      <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
        <div className="h-20 sm:h-0" />
        <div
          className={cn(
            "w-full h-[85dvh] px-6 flex items-center gap-0 justify-center transition-[height,gap] duration-500",
            selectedRecordingId && "gap-4",
          )}
        >
          <div className="h-full flex flex-col justify-center gap-4 sm:w-11/12 max-w-md">
            <RecordPanel
              recordingsModeSelection={recordingsModeSelection}
              setRecordingsModeSelection={setRecordingsModeSelection}
            />
            <RecordingsList
              recordings={recordings}
              setRecordings={setRecordings}
              handleSelectedRecordingId={(selectedRecordingId) => {
                setSelectedRecordingId(selectedRecordingId);
              }}
            />
          </div>
          <RecordingContent
            recordings={recordings}
            selectedRecordingId={selectedRecordingId}
          />
        </div>
        <div className="h-2 sm:h-0" />
      </div>
      <Settings user={user} isPro={isPro} setIsPro={setIsPro} />
    </>
  );
}

function RecordPanel({
  recordingsModeSelection,
  setRecordingsModeSelection,
}: {
  recordingsModeSelection: number;
  setRecordingsModeSelection: Dispatch<SetStateAction<number>>;
}) {
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
      <div className="flex sm:flex-row flex-col gap-3 mt-4 w-full">
        <div className="flex-grow flex gap-3 h-12">
          <Button className="flex-grow h-full rounded-full p-0">
            <MicIcon className="!h-6 !w-auto" />
          </Button>
          <Button
            variant="border"
            className="aspect-square w-auto h-full rounded-full p-0"
          >
            <UploadIcon className="!h-5 !w-auto" />
          </Button>
        </div>
        <Select>
          <SelectTrigger className="sm:w-52 w-full h-12 bg-stone-100">
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

function RecordingContent({
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
          className="w-full h-full px-5 py-5"
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
    const selectedRecording = recordings.find(
      (recording) => recording.id === selectedRecordingId,
    );

    if (!selectedRecording) {
      return <h1>請選擇一個會議記錄</h1>;
    }

    return (
      <>
        <h1 className="text-3xl font-semibold">{selectedRecording.title}</h1>
        <AudioPlayer audioSourcePath={selectedRecording.audioSourcePath} />
      </>
    );
  }
}

function RecordingsList({
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
            {recordings.map((meeting, index) => (
              <AccordionContent
                key={meeting.id}
                className={cn("p-0", index === 0 ? "mt-4" : "pt-0")}
              >
                <RadioGroupItem
                  value={meeting.id}
                  id={meeting.id}
                  className="hidden"
                />
                <Label
                  htmlFor={meeting.id}
                  className={cn(
                    "flex items-center justify-between gap-4 hover:bg-[#383838] transition-colors duration-200 cursor-pointer px-2 pb-1.5 rounded-lg",
                    selectedRecordingId === meeting.id && "bg-[#383838]",
                  )}
                >
                  <div>
                    <p className="flex items-center text-xs text-muted-foreground">
                      {
                        readableTime.formatElapsedTime(meeting.durationMs)
                          .string
                      }
                      <DotIcon className="-mx-1.5" />
                      {new Date(meeting.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-base sm:text-lg">{meeting.title}</p>
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

function Settings({
  user,
  isPro,
  setIsPro,
}: {
  user: User;
  isPro: boolean;
  setIsPro: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog>
      <DialogTrigger className="fixed top-0 right-0 flex items-center gap-2 rounded-bl-3xl border-none bg-white px-3 py-2">
        <Avatar className="border border-primary h-8 w-auto aspect-square">
          <AvatarImage src={user.picture} />
          <AvatarFallback
            className={
              (user.given_name?.length || 0) > 2 ? "text-xs" : "text-sm"
            }
          >
            {user.given_name}
          </AvatarFallback>
        </Avatar>
        <p className="hidden sm:block max-w-32 flex-grow text-left font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          {`${user.given_name} ${user.family_name}`}
        </p>
        <div className="flex items-center gap-3 bg-background px-3 py-1.5 rounded-full">
          <Icons type="yu-credit-dark" className="h-4 w-auto" />
          <p className="text-xs">{isPro ? "300 小時" : "300 分鐘"}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-black border-none text-white !rounded-2xl px-4 sm:px-6 py-4 sm:py-5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="border border-primary h-12 w-auto aspect-square">
              <AvatarImage src={user.picture} />
              <AvatarFallback
                className={cn(
                  "bg-stone-700",
                  (user.given_name?.length || 0) > 2 ? "text-xs" : "text-sm",
                )}
              >
                {user.given_name}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow flex flex-col gap-1 h-full py-1">
              <p className="text-left font-semibold text-white text-ellipsis overflow-hidden whitespace-nowrap">
                {`${user.given_name} ${user.family_name}`}
              </p>
              <p className="text-left text-muted-foreground text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                {user.email}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="bg-primary rounded-2xl px-3 sm:px-5 py-3 sm:py-4">
          <p>當前：{isPro ? "高級方案" : "免費方案"}</p>
          <div className="flex items-center justify-between mt-3 mx-2">
            <p className="flex items-center gap-2">
              <Icons type="yu-credit-light" className="h-4 w-auto" />
              <span className="-mt-[2px]">會議記錄</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-xs">剩餘</span>
              <span className="-mt-[2px]">
                {isPro ? "300 小時" : "300 分鐘"}
              </span>
            </p>
          </div>
          <Separator className="mt-4" />
          <Button
            onClick={() => {
              setIsPro(!isPro);
            }}
            className="rounded-xl mt-4 bg-[#076AFF] hover:bg-[#065ad8] w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg h-fit"
          >
            {isPro ? "降級至免費方案" : "升級至高級方案"}
          </Button>
          <Button className="rounded-xl mt-3 bg-[#076aff27] hover:bg-[#065ad827] text-[#076AFF] w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg h-fit">
            檢視方案 / 購買更多時數
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
