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

const router = Router();

router.use(authenticate);

router.post('/courses/:courseId/lessons', requireProfessor, createLesson);
router.get('/courses/:courseId/lessons', getCourseLessons);
router.get('/:id', getLesson);
router.put('/:id', requireProfessor, updateLesson);
router.delete('/:id', requireProfessor, deleteLesson);

export default router;
