import { Underline } from "@/components/Underline";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | YU Meeting",
  description: "捕捉每刻 靈感，會議記錄從未如此簡單",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
      <Link href="/login" className="fixed top-4 left-5">
        <Underline>Login to use YU Meeting</Underline>
      </Link>
    </div>
  );
}
