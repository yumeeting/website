"use client";

import { Dot, Ellipsis, Mic, Upload } from "lucide-react";
import { permanentRedirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@auth0/nextjs-auth0/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icons from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { readableTime } from "@/modules/readableTime";

type Meeting = {
  id: number;
  title: string;
  durationMs: number;
  createdAt: number;
};

const meetingModesOption = [
  "一般會議記錄",
  "一般會議記錄（非常詳細）",
  "上課內容記錄",
  "上課內容記錄（非常詳細）",
  "專案會議記錄",
  "通話記錄",
  "合約會議記錄",
];

export default function Dashboard() {
  const { user, isLoading: isAuth0Loading } = useUser();

  const [meetingModeSelection, setMeetingModeSelection] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "關於多語言海報設計的反饋與建議",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      createdAt: Date.now(),
    },
    {
      id: 2,
      title: "增強品牌與產品案例展示及其他項目討論",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      createdAt: Date.now() - Math.floor(Math.random() * 11) * 86400000,
    },
    {
      id: 3,
      title: "顧客與店員關於商品維修的詳細對話",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
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
    <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
      <div className="w-11/12 max-w-md">
        <div className="rounded-lg p-5 bg-white">
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
              <button
                type="button"
                className="flex-grow flex items-center justify-center h-full rounded-full text-background bg-foreground hover:bg-stone-700 transition-colors duration-300"
              >
                <Mic />
              </button>
              <button
                type="button"
                className="flex items-center justify-center aspect-square h-full rounded-full border border-foreground hover:bg-stone-200 transition-colors duration-300"
              >
                <Upload className="h-5 w-auto" />
              </button>
            </div>
            <Select>
              <SelectTrigger className="sm:w-52 w-full h-12 bg-stone-100">
                <div>
                  <p className="text-xs text-left text-stone-500">模式</p>
                  <SelectValue
                    placeholder={meetingModesOption[meetingModeSelection]}
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                {meetingModesOption.map((mode, index) => (
                  <SelectItem
                    key={index}
                    value={String(index)}
                    className="cursor-pointer"
                    onClick={() => setMeetingModeSelection(index)}
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
        <div className="flex flex-col bg-foreground rounded-md mt-4 gap-2 px-5 py-4 pb-5">
          <MeetingsList meetings={meetings} setMeetings={setMeetings} />
          <Settings user={user} isPro={isPro} setIsPro={setIsPro} />
        </div>
      </div>
    </div>
  );
}

function MeetingsList({
  meetings,
  setMeetings: _setMeetings,
}: { meetings: Meeting[]; setMeetings: Dispatch<SetStateAction<Meeting[]>> }) {
  return (
    <Accordion type="single" collapsible className="text-white w-full">
      <AccordionItem value="meetings">
        <AccordionTrigger className="pt-0 pb-2">展開會議紀錄</AccordionTrigger>
        <AccordionContent />
        {meetings.map((meeting) => (
          <AccordionContent key={meeting.id}>
            <div className="flex items-center justify-between gap-4 hover:bg-[#383838] transition-colors duration-200 cursor-pointer px-2 py-1 rounded-lg">
              <div>
                <p className="flex items-center text-xs text-muted-foreground">
                  {readableTime.formatElapsedTime(meeting.durationMs).string}
                  <Dot className="-mx-1.5" />
                  {new Date(meeting.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg">{meeting.title}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-1.5 aspect-square rounded-xl hover:bg-foreground transition-colors duration-200">
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#383838] border-none text-white">
                  <DropdownMenuItem className="cursor-pointer">
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Rename
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
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
      <DialogTrigger className="mt-3 flex items-center gap-2 rounded-lg bg-white bg-opacity-10 px-3 py-2 w-full">
        <Avatar className="border border-foreground h-8 w-auto">
          <AvatarImage src={user.picture} />
          <AvatarFallback
            className={
              (user.given_name?.length || 0) > 2 ? "text-xs" : "text-sm"
            }
          >
            {user.nickname}
          </AvatarFallback>
        </Avatar>
        <p className="flex-grow text-left font-semibold text-white text-ellipsis overflow-hidden whitespace-nowrap">
          {`${user.given_name} ${user.family_name}`}
        </p>
        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full">
          <Icons type="yu-credit-dark" className="h-4 w-auto" />
          <p className="text-xs">{isPro ? "300 小時" : "300 分鐘"}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-black border-none text-white !rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="border border-foreground h-12 w-auto">
              <AvatarImage src={user.picture} />
              <AvatarFallback
                className={
                  (user.given_name?.length || 0) > 2 ? "text-xs" : "text-sm"
                }
              >
                {user.nickname}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow flex flex-col gap-1 h-full py-1">
              <p className="text-left font-semibold text-white text-ellipsis overflow-hidden whitespace-nowrap">
                {`${user.given_name} ${user.family_name}`}
              </p>
              <p className="text-muted-foreground text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                {user.email}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="bg-foreground rounded-2xl px-5 py-4">
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
            className="rounded-2xl mt-4 bg-[#076AFF] hover:bg-[#065ad8] w-full px-4 py-3 text-lg h-fit"
          >
            {isPro ? "降級至免費方案" : "升級至高級方案"}
          </Button>
          <Button className="rounded-2xl mt-2 bg-[#076aff27] hover:bg-[#065ad827] text-[#076AFF] w-full px-4 py-3 text-lg h-fit">
            檢視方案 / 購買更多時數
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
