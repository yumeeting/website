export type Record = {
  id: string;
  title: string;
  durationMs: number;
  audioSourcePath: string;
  notes: string;
  transcripts: {
    userName: string;
    text: string;
    startTime: number; // ms
  }[];
  createdAt: number;
};
