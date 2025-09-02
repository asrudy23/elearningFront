import { User } from "./user";
import { FileResponse } from "./file";
import { ChapterResponse } from "./chapter";
import { QuizResponse } from "./quiz";
import { Category } from "./enums/category"; // <-- Importer le type Category

// Correspond à CourseRequest
export interface CourseRequestPayload {
  title: string;
  description: string;
  category: Category; // <-- Ajout du champ
  teacherIds: number[];
  file: File;
}

// Correspond à CourseResponse
export interface CourseResponse {
  id: number;
  title: string;
  description: string;
  category: Category; // <-- Ajout du champ
  file: FileResponse;
  chapters: ChapterResponse[];
  quizzes: QuizResponse[];
  students: User[];
  teachers: User[];
}