import express from "express";
import { createQuiz, getQuizzes } from "../controllers/quizController.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getQuizzes);

export default router;
