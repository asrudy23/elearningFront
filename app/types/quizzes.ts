import apiClient from '../../lib/api/axios';
import { QuizRequest, QuizResponse } from './quiz';

export const createQuiz = async (payload: QuizRequest): Promise<QuizResponse> => {
  const response = await apiClient.post<QuizResponse>('/quizzes', payload);
  return response.data;
};