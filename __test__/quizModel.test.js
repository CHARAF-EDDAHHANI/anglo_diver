import { createQuiz, getQuizzes } from "../models/quizModel.js";
import { readJson, writeJson } from "../Agents/DBAccess.js";

jest.mock("../Agents/DBAccess.js");

describe("Quiz Model", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  test("createQuiz adds a quiz", async () => {
    readJson.mockResolvedValue([]);
    writeJson.mockResolvedValue();

    const quizData = {
      title: "Test Quiz",
      level: "easy",
      questions: [{ text: "Q1", type: "text" }]
    };

    const newQuiz = await createQuiz(quizData);

    expect(newQuiz).toHaveProperty("quizId");
    expect(newQuiz.title).toBe("Test Quiz");
    expect(writeJson).toHaveBeenCalledWith("quizzes", expect.any(Array));
  });

  test("getQuizzes returns quizzes", async () => {
    const mockQuizzes = [{ quizId: "abc", title: "Mock Quiz" }];
    readJson.mockResolvedValue(mockQuizzes);

    const quizzes = await getQuizzes();
    expect(quizzes).toEqual(mockQuizzes);
  });
});
