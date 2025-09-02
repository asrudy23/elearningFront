import { FileResponse } from "./file";

export interface LessonRequest {
  title: string;
  content: string;
  file?: File;
}

export interface LessonResponse {
  id: number;
  title: string;
  content: string;
  file: FileResponse | null;
  chapterId: number;
}