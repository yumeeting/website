import { Mic, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Underline } from "@/components/Underline";

export const metadata: Metadata = {
  title: "Home | YU Meeting",
  description: "捕捉每刻 靈感，會議記錄從未如此簡單",
};

export default function Home() {
  return (
    <>
      <Link href="/login" className="fixed bottom-3 right-4">
        <Underline>Go to login page</Underline>
      </Link>
      <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
        <div className="w-11/12 max-w-96">
          <div className="border border-foreground rounded-lg p-6 bg-gray-100">
            <div>
              <p className="text-lg font-bold font-outfit">YU Meeting</p>
              <p className="text-xs font-inter mt-2">
                copyright ©{" "}
                <a
                  href="https://yuniverses.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="font-bold">YUNIVER</span>
                </a>{" "}
                ® {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex gap-3 mt-6 w-full h-12">
              <button
                type="button"
                className="flex-grow flex items-center justify-center rounded-full border-2 border-black text-neutral-800 bg-stone-50 hover:bg-stone-200 transition-colors duration-300"
              >
                <Mic />
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors duration-300 aspect-square"
              >
                <Plus className="h-3/5 w-auto" />
              </button>
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
