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
      title: "YU Meeting 開發進度更新：轉錄、摘要與自動化",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-0.m4a",
      notes: `
# YU Meeting 開發進度

## 主要更新
- **即時錄音與轉錄** 已實作，準確度相當穩定。  
- **摘要功能** 正在測試，AI 可生成簡潔的會議摘要。  
- **說話人識別** 已改善，特別是在小型會議中準確度較高。  
  - 需要進一步測試大型會議，當多人同時發言時，準確度仍有待提升。  
- **日曆整合** 正在開發中：  
  - 用戶將可同步 YU Meeting 與 Google 日曆。  
  - 系統將自動錄製已排定的會議，無需手動啟動錄音。  

## 下一步行動
- 在不同情境下進行更多測試，以改善說話人識別的準確度。  
- 持續優化 **使用者體驗（UX）**，確保 AI 生成的筆記準確無誤。  
- 進行 **使用者回饋收集**，藉由 Beta 測試進一步調整與優化。  
- 儘快推出 **Beta 版本**，供早期測試者試用。  
- **本週內完成** 這些關鍵步驟。
`.trim(),
      transcripts: [
        {
          userName: "shirojun",
          text: "好了，我們來檢視一下 YU Meeting 的最新進展。",
          startTime: 0,
        },
        {
          userName: "OnCloud",
          text: "是的，目前我們已經實作了即時錄音和轉錄功能。AI 現在可以生成準確度相當高的逐字稿。",
          startTime: 2000,
        },
        {
          userName: "Eric",
          text: "這很棒！那摘要功能呢？目前效果如何？",
          startTime: 5000,
        },
        {
          userName: "OnCloud",
          text: "我們已經開始測試了。AI 現在可以根據會議中的重點，自動生成簡潔的會議摘要。",
          startTime: 7000,
        },
        {
          userName: "shirojun",
          text: "聽起來很有潛力。我們有解決發言者識別的問題嗎？",
          startTime: 10000,
        },
        {
          userName: "Eric",
          text: "已經有很大改善了。目前系統在小型會議中的發言者識別準確度提高了不少。",
          startTime: 12000,
        },
        {
          userName: "OnCloud",
          text: "是的，但在大型會議中還需要進一步測試。當多人同時發言時，識別準確度仍然會下降。",
          startTime: 15000,
        },
        {
          userName: "shirojun",
          text: "了解，我們應該針對不同場景進行更多測試。另外，與行事曆應用的整合進展如何？",
          startTime: 18000,
        },
        {
          userName: "Eric",
          text: "我們已經開始開發了。很快，使用者就可以將 YU Meeting 與 Google 行事曆同步，讓系統自動錄製排定的會議。",
          startTime: 20000,
        },
        {
          userName: "OnCloud",
          text: "沒錯，我們的目標是讓使用者不需要手動開始錄音，系統會自動處理。",
          startTime: 22000,
        },
        {
          userName: "shirojun",
          text: "太好了！這樣會讓流程更順暢。我們要繼續優化使用者體驗，確保 AI 生成的筆記足夠精準。",
          startTime: 25000,
        },
        {
          userName: "Eric",
          text: "同意。我們也會在 Beta 測試期間收集用戶意見，進一步調整。",
          startTime: 27000,
        },
        {
          userName: "OnCloud",
          text: "對，我們很快就能推出 Beta 版本供早期測試者使用。",
          startTime: 29000,
        },
        {
          userName: "shirojun",
          text: "好的，那我們目標是在這週內完成這些下一步的工作。",
          startTime: 31000,
        },
      ],
      createdAt: Date.now(),
    },
    {
      id: "2",
      title:
        "YU Meeting Development Update: Transcription, Summarization, and Automation",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-1.m4a",
      notes: `
# YU Meeting Development Progress

## Key Updates
- **Real-time recording & transcription** has been implemented with solid accuracy.  
- **Summarization feature** is in testing; the AI generates concise meeting summaries.  
- **Speaker identification** has improved, particularly for small meetings.  
  - Needs further testing for larger meetings, as accuracy drops with multiple speakers.  
- **Calendar integration** is in development:  
  - Users will soon be able to sync YU Meeting with Google Calendar.  
  - Automatic recording will be enabled for scheduled meetings.  

## Next Steps
- Conduct more tests under different scenarios to improve speaker identification.  
- Continue refining the **UX** and ensure AI-generated notes remain precise.  
- Gather **user feedback** during beta testing for further improvements.  
- Release a **beta version** soon for early testers.  
- Aim to **finalize these next steps within the week**.
`.trim(),
      transcripts: [
        {
          userName: "shirojun",
          text: "Alright, let's go over the latest progress on YU Meeting.",
          startTime: 0,
        },
        {
          userName: "OnCloud",
          text: "Yeah, so far, we've implemented real-time recording and transcription. The AI can now generate transcriptions with pretty solid accuracy.",
          startTime: 2000,
        },
        {
          userName: "Eric",
          text: "That's great. How about the summarization feature? Is it working as expected?",
          startTime: 5000,
        },
        {
          userName: "OnCloud",
          text: "Yes, we've started testing it. The AI can now generate concise meeting summaries based on the key points discussed.",
          startTime: 7000,
        },
        {
          userName: "shirojun",
          text: "Sounds promising. Have we addressed the issue with speaker identification?",
          startTime: 10000,
        },
        {
          userName: "Eric",
          text: "We've improved it a lot. The system can now distinguish between speakers with better accuracy, especially in smaller meetings.",
          startTime: 12000,
        },
        {
          userName: "OnCloud",
          text: "Yeah, but we still need testing for larger meetings. Speaker identification sometimes struggles when many people talk simultaneously.",
          startTime: 15000,
        },
        {
          userName: "shirojun",
          text: "Got it. We should run more tests under different scenarios. Also, what about integration with calendar apps?",
          startTime: 18000,
        },
        {
          userName: "Eric",
          text: "We've started working on it. Users will soon be able to sync YU Meeting with Google Calendar to automatically record scheduled meetings.",
          startTime: 20000,
        },
        {
          userName: "OnCloud",
          text: "Exactly. We're designing it so users don't need to manually start recordings—the system will handle it automatically.",
          startTime: 22000,
        },
        {
          userName: "shirojun",
          text: "Nice! That will make it seamless. Let's keep refining the UX and ensure the AI-generated notes are precise.",
          startTime: 25000,
        },
        {
          userName: "Eric",
          text: "Agreed. We'll also collect user feedback during beta testing to fine-tune it further.",
          startTime: 27000,
        },
        {
          userName: "OnCloud",
          text: "Yep. We should have a beta version ready for early testers soon.",
          startTime: 29000,
        },
        {
          userName: "shirojun",
          text: "Alright, let's aim to finalize these next steps within the week.",
          startTime: 31000,
        },
      ],
      createdAt: Date.now() - Math.floor(Math.random() * 11) * 86400000,
    },
    {
      id: "3",
      title: "The Irresistible Kitten",
      durationMs: Math.floor(Math.random() * (600000 - 10000 + 1)) + 10000,
      audioSourcePath: "audios/test-audio-0.m4a",
      notes: `
## Discussion About a Cat Video
- **Shirojun** asks if others have seen a viral adorable cat video.
- **OnCloud** describes the video, mentioning a tiny kitten climbing a couch.
- **Eric** agrees and praises the kitten's fluffiness and cute paws.
- **Shirojun** highlights the kitten's meowing when it struggles to climb.
- **OnCloud** reminisces about their own cat as a kitten.

## Conversation About OnCloud's Cat
- **Eric** asks how old OnCloud's cat is.
- **OnCloud** shares that she is three years old but still acts like a kitten.
- **Shirojun** comments on how cats always capture people's hearts.
`.trim(),
      transcripts: [
        {
          userName: "shirojun",
          text: "Hey, have you guys seen that adorable cat video going around?",
          startTime: 0,
        },
        {
          userName: "OnCloud",
          text: "Oh! The one with the tiny kitten trying to climb up the couch?",
          startTime: 1500,
        },
        {
          userName: "Eric",
          text: "Yes! That kitten is so fluffy. Its little paws are the cutest!",
          startTime: 3200,
        },
        {
          userName: "shirojun",
          text: "Right? And the way it meows when it can't reach the top is just heart-melting.",
          startTime: 5000,
        },
        {
          userName: "OnCloud",
          text: "Haha, yeah. It reminds me of my own cat when she was a kitten.",
          startTime: 7100,
        },
        {
          userName: "Eric",
          text: "Aww, how old is your cat now?",
          startTime: 9200,
        },
        {
          userName: "OnCloud",
          text: "She's three now, but she still acts like a baby sometimes.",
          startTime: 10800,
        },
        {
          userName: "shirojun",
          text: "That's so cute. Cats always know how to steal our hearts.",
          startTime: 12400,
        },
      ],
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
