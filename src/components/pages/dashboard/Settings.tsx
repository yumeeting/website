import { Dispatch, SetStateAction } from "react";

import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { User } from "@auth0/nextjs-auth0/types";

export function Settings({
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
