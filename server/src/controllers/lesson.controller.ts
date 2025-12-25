import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest, CreateLessonInput, UpdateLessonInput } from '../types';

export const createLesson = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { courseId } = req.params;
    const { title, content, order }: CreateLessonInput = req.body;

    if (!title || !content || order === undefined) {
      res.status(400).json({ error: 'Title, content, and order are required' });
      return;
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    if (course.professorId !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to add lessons to this course' });
      return;
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        order,
        courseId,
      },
      include: {
        exercises: true,
      },
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCourseLessons = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { courseId } = req.params;

    const lessons = await prisma.lesson.findMany({
      where: { courseId },
      include: {
        exercises: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    res.json(lessons);
  } catch (error) {
    console.error('Get course lessons error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLesson = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
        exercises: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' });
      return;
    }

    res.json(lesson);
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLesson = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;
    const updateData: UpdateLessonInput = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' });
      return;
    }

    if (lesson.course.professorId !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to update this lesson' });
      return;
    }

    const updatedLesson = await prisma.lesson.update({
      where: { id },
      data: updateData,
      include: {
        exercises: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    res.json(updatedLesson);
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLesson = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' });
      return;
    }

    if (lesson.course.professorId !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to delete this lesson' });
      return;
    }

    await prisma.lesson.delete({
      where: { id },
    });

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
