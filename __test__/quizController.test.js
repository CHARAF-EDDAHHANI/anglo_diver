import request from "supertest";
import express from "express";
import * as quizController from "../controllers/quizController.js";

// Setup express app for testing
const app = express();
app.use(express.json());
app.post("/api/quizzes", quizController.createQuiz);
app.get("/api/quizzes", quizController.getQuizzes);

// Mock the model
import * as quizModel from "../models/quizModel.js";
jest.mock("../models/quizModel.js");

describe("Quiz Controller", () => {
  beforeEach(() => {
    quizModel.createQuiz.mockReset();
    quizModel.getQuizzes.mockReset();
  });

  test("POST /api/quizzes returns 201", async () => {
    const mockQuiz = { quizId: "1", title: "Test Quiz" };
    quizModel.createQuiz.mockResolvedValue(mockQuiz);

    const res = await request(app)
      .post("/api/quizzes")
      .send({
        title: "Test Quiz",
        level: "easy",
        questions: [{ text: "Q1", type: "text" }]
      });

    expect(res.status).toBe(201);
    expect(res.body.newQuiz.title).toBe("Test Quiz");
  });

  test("GET /api/quizzes returns 200", async () => {
    const mockQuizzes = [{ quizId: "1", title: "Quiz1" }];
    quizModel.getQuizzes.mockResolvedValue(mockQuizzes);

    const res = await request(app).get("/api/quizzes");

    expect(res.status).toBe(200);
    expect(res.body[0].title).toBe("Quiz1");
  });
});
