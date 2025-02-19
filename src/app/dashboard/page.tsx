"use client";

import { Frown, LogOut, Mic, Sparkle, Upload, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

export default function Dashboard() {
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
      <div className="fixed top-3 left-4">
        <Link
          href="/login"
          className="flex items-center gap-2 hover:bg-stone-300 transition-colors duration-300 px-2 py-1 rounded-lg"
        >
          <Image
            src="/images/logo.svg"
            alt="YU Meeting Logo"
            width={50}
            height={50}
            className="h-9 w-auto -mt-[2px]"
            priority
          />
          <p className="text-lg font-semibold font-outfit">YU Meeting</p>
        </Link>
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
                    <SelectValue placeholder="一般會議記錄" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">一般會議記錄</SelectItem>
                  <SelectItem value="1">一般會議記錄（非常詳細）</SelectItem>
                  <SelectItem value="2">上課內容記錄</SelectItem>
                  <SelectItem value="3">上課內容記錄（非常詳細）</SelectItem>
                  <SelectItem value="4">專案會議記錄</SelectItem>
                  <SelectItem value="5">通話記錄</SelectItem>
                  <SelectItem value="6">合約會議記錄</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="bg-foreground h-11 rounded-md mt-4 flex items-center gap-2 px-7">
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
    </>
  );
}
