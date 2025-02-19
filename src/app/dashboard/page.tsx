"use client";

import { Frown, LogOut, Mic, Sparkle, Upload, User } from "lucide-react";
import { permanentRedirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";

import { Underline } from "@/components/Underline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function Dashboard() {
  const meetingModesOption = [
    "一般會議記錄",
    "一般會議記錄（非常詳細）",
    "上課內容記錄",
    "上課內容記錄（非常詳細）",
    "專案會議記錄",
    "通話記錄",
    "合約會議記錄",
  ];
  const [meetingModeSelection, setMeetingModeSelection] = useState(0);

  const { user, isLoading } = useUser();

  const [isPro, setIsPro] = useState(false);

  if (isLoading) {
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
          <div className="bg-foreground rounded-md mt-4 flex items-center gap-2 px-5 py-4">
            <p className="text-white cursor-pointer">
              <Underline lineColor="bg-white">展開紀錄</Underline>
            </p>
            <div className="flex-grow" />
            <div>
              <input
                type="text"
                placeholder="搜索會議..."
                className="bg-black text-white rounded-sm px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="fixed top-3 right-4 flex items-center gap-2 rounded-lg border border-stone-300 bg-background px-3 py-2 max-w-56 min-w-48">
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
          <p className="flex-grow text-left font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
            {`${user.given_name} ${user.family_name}`}
          </p>
          <Badge className="bg-background text-foreground pointer-events-none">
            {isPro ? "Pro" : "Free"}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="bg-background border-stone-300 dropdown-content-width-full min-w-48"
        >
          <DropdownMenuLabel className="overflow-x-auto light-scrollbar">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-stone-300" />
          <DropdownMenuItem className="cursor-pointer">
            <User />
            Profile
          </DropdownMenuItem>
          {!isPro && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setIsPro(true);
              }}
            >
              <Sparkle />
              Upgrade to Pro
            </DropdownMenuItem>
          )}
          {isPro && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setIsPro(false);
              }}
            >
              <Frown />
              Downgrade to Free
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-stone-300" />
          <a href="/auth/logout">
            <DropdownMenuItem className="cursor-pointer">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </a>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
