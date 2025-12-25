import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest, CreateExerciseInput, UpdateExerciseInput } from '../types';

export const createExercise = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { lessonId } = req.params;
    const { title, description, content, order }: CreateExerciseInput = req.body;

    if (!title || !content || order === undefined) {
      res.status(400).json({ error: 'Title, content, and order are required' });
      return;
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' });
      return;
    }

    if (lesson.course.professorId !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to add exercises to this lesson' });
      return;
    }

    const exercise = await prisma.exercise.create({
      data: {
        title,
        description,
        content,
        order,
        lessonId,
      },
    });

    res.status(201).json(exercise);
  } catch (error) {
    console.error('Create exercise error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateExercise = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;
    const updateData: UpdateExerciseInput = req.body;

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: {
        lesson: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    if (exercise.lesson.course.professorId !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to update this exercise' });
      return;
    }

    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedExercise);
  } catch (error) {
    console.error('Update exercise error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteExercise = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: {
        lesson: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    if (exercise.lesson.course.professorId !== req.user.id) {
      res.status(403).json({ error: 'Not authorized to delete this exercise' });
      return;
    }

    await prisma.exercise.delete({
      where: { id },
    });

    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Delete exercise error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
