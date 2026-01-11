import { createSession, getSessions } from "../models/sessionModel.js";
import { writeJson, readJson } from "../Agents/DBAccess.js";

// Mock DB access to avoid writing real files
jest.mock("../Agents/DBAccess.js");

describe("Session Model", () => {
  beforeEach(() => {
    readJson.mockReset();
    writeJson.mockReset();
  });

  test("createSession adds a session", async () => {
    readJson.mockResolvedValue([]); // start with empty sessions
    writeJson.mockResolvedValue(); // mock write

    const sessionData = { title: "Test Session", type: "online", level: "easy" };
    const newSession = await createSession(sessionData);

    expect(newSession).toHaveProperty("id");
    expect(newSession.title).toBe("Test Session");
    expect(writeJson).toHaveBeenCalledWith("sessions", expect.any(Array));
  });

  test("getSessions returns sessions", async () => {
    const mockSessions = [{ id: "123", title: "Mock Session" }];
    readJson.mockResolvedValue(mockSessions);

    const sessions = await getSessions();
    expect(sessions).toEqual(mockSessions);
  });
});
