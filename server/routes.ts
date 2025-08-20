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

const partialUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const partialDir = path.join(process.cwd(), 'uploads', 'partial');
      if (!fs.existsSync(partialDir)) {
        fs.mkdirSync(partialDir, { recursive: true });
      }
      cb(null, partialDir);
    },
    filename: (req, file, cb) => {
      const sessionId = req.body.sessionId || 'unknown';
      const currentIndex = req.body.currentIndex || '0';
      const filename = `partial_recording_${sessionId}_index_${currentIndex}_${Date.now()}.wav`;
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

  // Upload partial recording (when game is paused/stopped)
  app.post("/api/recordings/partial", partialUpload.single('audio'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file provided" });
      }

      const partialData = {
        sessionId: req.body.sessionId,
        filename: req.file.filename,
        filepath: req.file.path,
        duration: parseInt(req.body.duration) || null,
        currentIndex: parseInt(req.body.currentIndex) || 0,
        isPartial: true
      };

      // Create a simplified recording entry for partial saves
      const recording = await storage.createRecording({
        sessionId: partialData.sessionId,
        filename: partialData.filename,
        filepath: partialData.filepath,
        duration: partialData.duration
      });
      
      res.json({ 
        ...recording, 
        currentIndex: partialData.currentIndex, 
        isPartial: true,
        message: "Partial recording saved successfully"
      });
    } catch (error) {
      res.status(400).json({ message: "Error saving partial recording", error });
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

  // Download recording file
  app.get("/api/recordings/:sessionId/download", async (req, res) => {
    try {
      const recording = await storage.getRecording(req.params.sessionId);
      if (!recording) {
        return res.status(404).json({ message: "Recording not found" });
      }

      if (!fs.existsSync(recording.filepath)) {
        return res.status(404).json({ message: "Recording file not found" });
      }

      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Content-Disposition', `attachment; filename="${recording.filename}"`);
      
      const fileStream = fs.createReadStream(recording.filepath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json({ message: "Error downloading recording", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
