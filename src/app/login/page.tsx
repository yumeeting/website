import Image from "next/image";

import { auth0 } from "@/lib/auth0";
import { Underline } from "@/components/Underline";

export default async function Login() {
  const session = await auth0.getSession();

  return (
    <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
      <div className="flex flex-col xl:flex-row xl:gap-20 items-center px-6 py-9">
        <Image
          src="/images/logo.svg"
          alt="YU Meeting Logo"
          width={450}
          height={450}
          priority
        />
        <div className="max-w-lg">
          <div className="-mt-4">
            <p className="text-lg font-bold font-outfit">YU Meeting</p>
            <p className="text-xs font-inter">
              {"copyright © "}
              <a href="https://yuniverses.com" target="_blank" rel="noreferrer">
                <span className="font-bold">
                  <Underline>YUNIVER</Underline>
                </span>
              </a>
              {` ® ${new Date().getFullYear()}`}
            </p>
          </div>
          <h1 className="mt-5 text-4xl leading-normal font-noto-serif-sc font-medium">
            捕捉每刻 <span className="font-black">靈感</span>
            <br />
            會議記錄從未如此簡單
          </h1>
          <p className="mt-5 text-base">
            我們致力於讓會議記錄變得簡單、快捷，讓每個人都能專注於真正重要的事情，提升會議的價值和效率。
          </p>
          <a
            href="/auth/login"
            className="flex items-center justify-center mt-12 w-full h-12 rounded-full border-2 border-black text-neutral-800 bg-stone-200 hover:bg-stone-300 transition-colors duration-300"
          >
            {session
              ? `Start as ${session.user.name}`
              : "Login to use YU Meeting"}
          </a>
        </div>
      </div>
    </div>
  );
}
