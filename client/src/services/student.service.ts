import { apiRequest } from './api';
import { Course, Enrollment, CourseProgress, ExerciseAttempt } from '../types';

export const getAvailableCourses = async (): Promise<Course[]> => {
  return apiRequest<Course[]>('/student/courses');
};

export const enrollInCourse = async (courseId: string): Promise<Enrollment> => {
  return apiRequest<Enrollment>(`/student/courses/${courseId}/enroll`, {
    method: 'POST',
  });
};

export const getEnrolledCourses = async (): Promise<Enrollment[]> => {
  return apiRequest<Enrollment[]>('/student/enrolled');
};

export const getCourseProgress = async (
  courseId: string
): Promise<CourseProgress> => {
  return apiRequest<CourseProgress>(`/student/courses/${courseId}/progress`);
};

export const submitExercise = async (
  exerciseId: string,
  answer: string
): Promise<ExerciseAttempt> => {
  return apiRequest<ExerciseAttempt>(`/student/exercises/${exerciseId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answer }),
  });
};
