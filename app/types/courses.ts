import apiClient from '../../lib/api/axios';
import { CourseResponse } from './course';

export const createCourse = async (payload: FormData): Promise<CourseResponse> => {
  const response = await apiClient.post<CourseResponse>('/courses', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};