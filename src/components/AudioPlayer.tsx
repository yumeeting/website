"use client";

import {
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  Volume1Icon,
  VolumeIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AudioPlayer({ audioSourcePath }: { audioSourcePath: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [preloadedTime, setPreloadedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration),
      );
      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime),
      );
      audio.addEventListener("progress", handleProgress);
      audio.addEventListener("ended", handleEnded);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", () =>
          setDuration(audio.duration),
        );
        audio.removeEventListener("timeupdate", () =>
          setCurrentTime(audio.currentTime),
        );
        audio.removeEventListener("progress", handleProgress);
        audio.removeEventListener("ended", handleEnded);
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
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
        className="h-7 w-auto aspect-square rounded-full"
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
          preloadValue={preloadedTime / duration}
        />
        <span className="text-sm -mt-[2px]">{formatTime(duration)}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-auto aspect-square rounded-full"
          >
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

  function handleEnded() {
    setIsPlaying(false);
  }

  function togglePlayPause() {
    if (audioRef.current) {
      if (isPlaying) {
        fadeAudio(false); // Fade out
      } else {
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0;
        }
        audioRef.current.play();
        fadeAudio(true); // Fade in
      }
      setIsPlaying(!isPlaying);
    }

    function fadeAudio(fadeIn: boolean) {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      const fadeStep = 0.02;
      const fadeInterval = 3; // ms

      if (fadeIn) {
        audio.volume = 0;
      }

      fadeIntervalRef.current = window.setInterval(() => {
        if (fadeIn) {
          if (audio.volume < volume) {
            audio.volume = Math.min(audio.volume + fadeStep, volume);
          } else {
            if (fadeIntervalRef.current !== null) {
              clearInterval(fadeIntervalRef.current);
            }
          }
        } else {
          if (audio.volume > 0) {
            audio.volume = Math.max(audio.volume - fadeStep, 0);
          } else {
            if (fadeIntervalRef.current !== null) {
              clearInterval(fadeIntervalRef.current);
            }
            audio.pause();
          }
        }
      }, fadeInterval);
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

  function handleProgress() {
    if (audioRef.current && audioRef.current.buffered.length > 0) {
      setPreloadedTime(
        audioRef.current.buffered.end(audioRef.current.buffered.length - 1),
      );
    }
  }
}
