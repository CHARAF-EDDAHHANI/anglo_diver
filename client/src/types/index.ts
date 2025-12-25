export enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  professorId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  professor: {
    id: string;
    name: string;
    email: string;
  };
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  description?: string;
  content: string;
  lessonId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  course: Course;
}

export interface ExerciseAttempt {
  id: string;
  userId: string;
  exerciseId: string;
  answer: string;
  completed: boolean;
  createdAt: string;
}

export interface CourseProgress {
  enrollment: Enrollment;
  totalExercises: number;
  completedExercises: number;
  progressPercentage: number;
}
