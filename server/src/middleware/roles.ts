import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { UserRole } from '@prisma/client';

export const requireProfessor = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== UserRole.PROFESSOR) {
    res.status(403).json({ error: 'Professor role required' });
    return;
  }
  next();
};

export const requireStudent = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== UserRole.STUDENT) {
    res.status(403).json({ error: 'Student role required' });
    return;
  }
  next();
};
