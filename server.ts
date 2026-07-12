import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Readable } from "stream";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Endpoint to proxy media downloads and completely bypass CORS on the client-side
  app.get("/api/download", async (req, res) => {
    const urlStr = req.query.url as string;
    const name = (req.query.name as string) || "video.mp4";

    if (!urlStr) {
      return res.status(400).send("URL parameter is required");
    }

    try {
      // Fetch the remote stream (Native fetch automatically follows redirects)
      const response = await fetch(urlStr);
      if (!response.ok) {
        return res.status(response.status).send(`Failed to fetch source video: ${response.statusText}`);
      }

      // Configure attachment download headers
      res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(name)}"`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      const contentType = response.headers.get("content-type");
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      } else {
        res.setHeader("Content-Type", "application/octet-stream");
      }

      const contentLength = response.headers.get("content-length");
      if (contentLength) {
        res.setHeader("Content-Length", contentLength);
      }

      if (!response.body) {
        return res.status(500).send("No response body received from source URL");
      }

      // Convert Web ReadableStream to Node Readable Stream and pipe to express response
      const nodeStream = Readable.fromWeb(response.body as any);
      nodeStream.pipe(res);

    } catch (err: any) {
      console.error("Proxy download failed:", err);
      if (!res.headersSent) {
        res.status(500).send(`Download failed: ${err.message}`);
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
