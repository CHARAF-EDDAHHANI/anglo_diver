import { Router } from 'express';
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller';
import { authenticate } from '../middleware/auth';
import { requireProfessor } from '../middleware/roles';
import { createLimiter } from '../middleware/rateLimiter';

const router = Router();

router.use(authenticate);
router.use(requireProfessor);

router.post('/', createLimiter, createCourse);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
