export interface FileResponse {
  id: number;
  originalFileName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  uploadedAt: string; // Les dates sont souvent des chaînes ISO
  courseId: number | null;
  lessonId: number | null;
}