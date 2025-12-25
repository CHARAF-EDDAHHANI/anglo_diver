import { apiRequest } from './api';
import { Course, Lesson, Exercise } from '../types';

export const createCourse = async (
  title: string,
  description?: string
): Promise<Course> => {
  return apiRequest<Course>('/courses', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
};

export const getCourses = async (): Promise<Course[]> => {
  return apiRequest<Course[]>('/courses');
};

export const getCourse = async (id: string): Promise<Course> => {
  return apiRequest<Course>(`/courses/${id}`);
};

export const updateCourse = async (
  id: string,
  data: Partial<Course>
): Promise<Course> => {
  return apiRequest<Course>(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteCourse = async (id: string): Promise<void> => {
  return apiRequest<void>(`/courses/${id}`, {
    method: 'DELETE',
  });
};

export const createLesson = async (
  courseId: string,
  title: string,
  content: string,
  order: number
): Promise<Lesson> => {
  return apiRequest<Lesson>(`/lessons/courses/${courseId}/lessons`, {
    method: 'POST',
    body: JSON.stringify({ title, content, order }),
  });
};

export const getCourseLessons = async (courseId: string): Promise<Lesson[]> => {
  return apiRequest<Lesson[]>(`/lessons/courses/${courseId}/lessons`);
};

export const updateLesson = async (
  id: string,
  data: Partial<Lesson>
): Promise<Lesson> => {
  return apiRequest<Lesson>(`/lessons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteLesson = async (id: string): Promise<void> => {
  return apiRequest<void>(`/lessons/${id}`, {
    method: 'DELETE',
  });
};

export const createExercise = async (
  lessonId: string,
  title: string,
  content: string,
  description: string,
  order: number
): Promise<Exercise> => {
  return apiRequest<Exercise>(`/exercises/lessons/${lessonId}/exercises`, {
    method: 'POST',
    body: JSON.stringify({ title, content, description, order }),
  });
};

export const updateExercise = async (
  id: string,
  data: Partial<Exercise>
): Promise<Exercise> => {
  return apiRequest<Exercise>(`/exercises/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteExercise = async (id: string): Promise<void> => {
  return apiRequest<void>(`/exercises/${id}`, {
    method: 'DELETE',
  });
};
