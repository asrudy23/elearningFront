import apiClient from '../../lib/api/axios';
import { ChapterResponse } from './chapter';

export const createChapter = async (payload: FormData): Promise<ChapterResponse> => {
  const response = await apiClient.post<ChapterResponse>('/chapters', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};