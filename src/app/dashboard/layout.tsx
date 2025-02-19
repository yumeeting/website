import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Page from "./page";

export const metadata: Metadata = {
  title: "Home | YU Meeting",
  description: "捕捉每刻 靈感，會議記錄從未如此簡單",
};

export default function _Page() {
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
      <Page />
    </>
  );
}
