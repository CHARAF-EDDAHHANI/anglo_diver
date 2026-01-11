import * as quizModel from "../models/quizModel.js";

export const createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    const quiz = await quizModel.createQuiz(quizData);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "error creating quiz", error: error.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await quizModel.getQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "error get quizzes", error: error.message });
  }
};
