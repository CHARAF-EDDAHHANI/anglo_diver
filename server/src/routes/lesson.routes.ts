import { Router } from 'express';
import {
  createLesson,
  getCourseLessons,
  getLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lesson.controller';
import { authenticate } from '../middleware/auth';
import { requireProfessor } from '../middleware/roles';
import { createLimiter } from '../middleware/rateLimiter';

const router = Router();

router.use(authenticate);

router.post('/courses/:courseId/lessons', requireProfessor, createLimiter, createLesson);
router.get('/courses/:courseId/lessons', getCourseLessons);
router.get('/:id', getLesson);
router.put('/:id', requireProfessor, updateLesson);
router.delete('/:id', requireProfessor, deleteLesson);

export default router;
