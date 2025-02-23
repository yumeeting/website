"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  Volume1Icon,
  VolumeIcon,
} from "lucide-react";

export function AudioPlayer({ audioSourcePath }: { audioSourcePath: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (audioRef?.current) {
    audioRef.current.volume = volume;
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration),
      );
      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime),
      );
    }
    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", () =>
          setDuration(audio.duration),
        );
        audio.removeEventListener("timeupdate", () =>
          setCurrentTime(audio.currentTime),
        );
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-1 bg-background p-1 rounded-full shadow-md max-w-md">
      <audio ref={audioRef} src={audioSourcePath}>
        <track kind="captions" />
      </audio>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <PauseIcon className="h-6 w-6" />
        ) : (
          <PlayIcon className="h-6 w-6" />
        )}
      </Button>
      <div className="flex-grow flex items-center space-x-2">
        <span className="text-sm -mt-[2px]">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className="flex-grow"
        />
        <span className="text-sm -mt-[2px]">{formatTime(duration)}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ResponsiveVolumeIcon volume={volume} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="end"
          className="flex flex-wrap gap-1 w-52 p-2"
        >
          <p className="w-8 text-xs">{Math.round(volume * 100)}%</p>
          <div className="flex-grow flex items-center">
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  function ResponsiveVolumeIcon({ volume }: { volume: number }) {
    switch (true) {
      case volume <= 0.01:
        return <VolumeXIcon className="h-6 w-6" />;
      case volume < 0.33:
        return <VolumeIcon className="h-6 w-6" />;
      case volume < 0.66:
        return <Volume1Icon className="h-6 w-6" />;
      default:
        return <Volume2Icon className="h-6 w-6" />;
    }
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  function togglePlayPause() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function handleSeek(value: number[]) {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  }

  function handleVolumeChange(value: number[]) {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  }
}
