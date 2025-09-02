import { LessonRequest, LessonResponse } from "./lesson";

export interface ChapterRequest {
  title: string;
  courseId: number;
  lessons: LessonRequest[];
}

export interface ChapterResponse {
  id: number;
  title: string;
  courseId: number;
  lessons: LessonResponse[];
}