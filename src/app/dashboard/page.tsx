"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { permanentRedirect } from "next/navigation";
import { useState } from "react";

import { Spinner } from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { RecordPanel } from "@/components/pages/dashboard/RecordPanel";
import { Settings } from "@/components/pages/dashboard/Settings";
import { Recording } from "@/components/pages/dashboard/types/Recording";
import { RecordingsList } from "@/components/pages/dashboard/RecordingsList";
import { RecordingContent } from "@/components/pages/dashboard/RecordingContent";

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
      notes: `
Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

Just a link: www.nasa.gov.
`.trim(),
      createdAt: Date.now(),
    },
    {
      id: "2",
      title: "增強品牌與產品案例展示及其他項目討論",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-1.m4a",
      notes: `
# Hi, *Pluto*!
[OnCloud Blog](https://on-cloud.tw)
`.trim(),
      createdAt: Date.now() - Math.floor(Math.random() * 11) * 86400000,
    },
    {
      id: "3",
      title: "顧客與店員關於商品維修的詳細對話",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-0.m4a",
      notes: `
A paragraph with *emphasis* and **strong importance** Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ipsa adipisci error tempora mollitia maxime nesciunt reprehenderit repellendus consequuntur, ducimus vel dicta praesentium sapiente inventore voluptates veritatis. Fuga, at enim.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`.trim(),
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
