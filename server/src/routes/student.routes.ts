import { Router } from 'express';
import {
  getAvailableCourses,
  enrollInCourse,
  getEnrolledCourses,
  getCourseProgress,
  submitExercise,
} from '../controllers/student.controller';
import { authenticate } from '../middleware/auth';
import { requireStudent } from '../middleware/roles';
import { createLimiter } from '../middleware/rateLimiter';

const router = Router();

router.use(authenticate);

router.get('/courses', getAvailableCourses);
router.post('/courses/:id/enroll', requireStudent, createLimiter, enrollInCourse);
router.get('/enrolled', requireStudent, getEnrolledCourses);
router.get('/courses/:id/progress', requireStudent, getCourseProgress);
router.post('/exercises/:id/submit', requireStudent, submitExercise);

export default router;
