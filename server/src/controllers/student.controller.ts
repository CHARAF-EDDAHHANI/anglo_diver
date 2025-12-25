import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest, SubmitExerciseInput } from '../types';

export const getAvailableCourses = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        professor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(courses);
  } catch (error) {
    console.error('Get available courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const enrollInCourse = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    if (!course.isPublished) {
      res.status(400).json({ error: 'Course is not published' });
      return;
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId: id,
        },
      },
    });

    if (existingEnrollment) {
      res.status(400).json({ error: 'Already enrolled in this course' });
      return;
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user.id,
        courseId: id,
      },
      include: {
        course: {
          include: {
            professor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Enroll in course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEnrolledCourses = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        course: {
          include: {
            professor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    res.json(enrollments);
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourseProgress = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: req.user.id,
          courseId: id,
        },
      },
      include: {
        course: {
          include: {
            lessons: {
              include: {
                exercises: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      res.status(404).json({ error: 'Not enrolled in this course' });
      return;
    }

    const exerciseIds = enrollment.course.lessons
      .flatMap(lesson => lesson.exercises)
      .map(exercise => exercise.id);

    const completedAttempts = await prisma.exerciseAttempt.findMany({
      where: {
        userId: req.user.id,
        exerciseId: { in: exerciseIds },
        completed: true,
      },
    });

    const progress = {
      enrollment,
      totalExercises: exerciseIds.length,
      completedExercises: completedAttempts.length,
      progressPercentage: exerciseIds.length > 0
        ? Math.round((completedAttempts.length / exerciseIds.length) * 100)
        : 0,
    };

    res.json(progress);
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const submitExercise = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;
    const { answer }: SubmitExerciseInput = req.body;

    if (!answer) {
      res.status(400).json({ error: 'Answer is required' });
      return;
    }

    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    const attempt = await prisma.exerciseAttempt.create({
      data: {
        userId: req.user.id,
        exerciseId: id,
        answer,
        completed: true,
      },
      include: {
        exercise: true,
      },
    });

    res.status(201).json(attempt);
  } catch (error) {
    console.error('Submit exercise error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
