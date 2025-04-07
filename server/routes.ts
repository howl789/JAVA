import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET endpoint for health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
  });

  // Future API endpoints can be added here
  // For example:
  // - Saving prompt templates to a database
  // - Loading saved templates
  // - User preferences
  // - Integration with AI image generation services

  const httpServer = createServer(app);
  return httpServer;
}
