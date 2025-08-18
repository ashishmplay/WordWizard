import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSessionSchema, insertRecordingSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const sessionId = req.body.sessionId || 'unknown';
      const filename = `recording_${sessionId}_${Date.now()}.wav`;
      cb(null, filename);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new session
  app.post("/api/sessions", async (req, res) => {
    try {
      const validatedData = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(validatedData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ message: "Invalid session data", error });
    }
  });

  // Get session by sessionId
  app.get("/api/sessions/:sessionId", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Error fetching session", error });
    }
  });

  // Update session progress
  app.patch("/api/sessions/:sessionId", async (req, res) => {
    try {
      const updates = req.body;
      const session = await storage.updateSession(req.params.sessionId, updates);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Error updating session", error });
    }
  });

  // Upload recording
  app.post("/api/recordings", upload.single('audio'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file provided" });
      }

      const recordingData = {
        sessionId: req.body.sessionId,
        filename: req.file.filename,
        filepath: req.file.path,
        duration: parseInt(req.body.duration) || null
      };

      const validatedData = insertRecordingSchema.parse(recordingData);
      const recording = await storage.createRecording(validatedData);
      
      res.json(recording);
    } catch (error) {
      res.status(400).json({ message: "Error saving recording", error });
    }
  });

  // Get recording by sessionId
  app.get("/api/recordings/:sessionId", async (req, res) => {
    try {
      const recording = await storage.getRecording(req.params.sessionId);
      if (!recording) {
        return res.status(404).json({ message: "Recording not found" });
      }
      res.json(recording);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recording", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
