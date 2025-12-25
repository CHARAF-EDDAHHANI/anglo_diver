import { Request } from 'express';
import { UserRole } from '@prisma/client';

export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateCourseInput {
  title: string;
  description?: string;
}

export interface UpdateCourseInput {
  title?: string;
  description?: string;
  isPublished?: boolean;
}

export interface CreateLessonInput {
  title: string;
  content: string;
  order: number;
}

export interface UpdateLessonInput {
  title?: string;
  content?: string;
  order?: number;
}

export interface CreateExerciseInput {
  title: string;
  description?: string;
  content: string;
  order: number;
}

export interface UpdateExerciseInput {
  title?: string;
  description?: string;
  content?: string;
  order?: number;
}

export interface SubmitExerciseInput {
  answer: string;
}
