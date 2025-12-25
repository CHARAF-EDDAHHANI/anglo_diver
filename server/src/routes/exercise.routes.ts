import { Router } from 'express';
import {
  createExercise,
  updateExercise,
  deleteExercise,
} from '../controllers/exercise.controller';
import { authenticate } from '../middleware/auth';
import { requireProfessor } from '../middleware/roles';

const router = Router();

router.use(authenticate);
router.use(requireProfessor);

router.post('/lessons/:lessonId/exercises', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export default router;
