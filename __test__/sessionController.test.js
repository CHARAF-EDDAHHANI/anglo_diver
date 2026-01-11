import request from "supertest";
import express from "express";
import * as sessionController from "../controllers/sessionController.js";

const app = express();
app.use(express.json());
app.post("/api/sessions", sessionController.createSession);
app.get("/api/sessions", sessionController.getSessions);

// Mock the model to avoid file writes
import * as sessionModel from "../models/sessionModel.js";
jest.mock("../models/sessionModel.js");

describe("Session Controller", () => {
  beforeEach(() => {
    sessionModel.createSession.mockReset();
    sessionModel.getSessions.mockReset();
  });

  test("POST /api/sessions returns 201", async () => {
    const mockSession = { id: "1", title: "Test Session" };
    sessionModel.createSession.mockResolvedValue(mockSession);

    const res = await request(app)
      .post("/api/sessions")
      .send({ title: "Test Session", type: "online", level: "easy" });

    expect(res.status).toBe(201);
    expect(res.body.newSession.title).toBe("Test Session");
  });

  test("GET /api/sessions returns 200", async () => {
    const mockSessions = [{ id: "1", title: "Session1" }];
    sessionModel.getSessions.mockResolvedValue(mockSessions);

    const res = await request(app).get("/api/sessions");

    expect(res.status).toBe(200);
    expect(res.body[0].title).toBe("Session1");
  });
});
