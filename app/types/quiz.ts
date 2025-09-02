export type QuizType = "CHAPTER" | "FINAL";

export interface QuestionRequest {
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface QuestionResponse {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;

  quizId: number;
}

export interface QuizRequest {
  type: QuizType;
  title: string;
  chapterId?: number;
  courseId?: number;
  questions: QuestionRequest[];
}

export interface QuizResponse {
  id: number;
  type: QuizType;
  title: string;
  chapterId: number | null;
  courseId: number | null;
  questions: QuestionResponse[];
}