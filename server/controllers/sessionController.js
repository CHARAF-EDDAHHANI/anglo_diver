import * as sessionModel from "../models/sessionModel.js";

// Create a new session
export const createSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const newSession = await sessionModel.createSession(sessionData);
    res.status(201).json({ message: "Session created successfully", newSession });
  } catch (error) {
    res.status(500).json({ message: "Error creating session", error: error.message });
  }
};

// Get all sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.getSessions();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error getting sessions", error: error.message });
  }
};
