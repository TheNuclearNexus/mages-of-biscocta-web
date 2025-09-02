const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
const rootDir = process.cwd();

// Map file extensions to MIME types
const mimeTypes = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
};

// Middleware to serve .gz files if they exist
app.get("*", (req, res, next) => {
  //B:\Projects\Builds\brackeys\Build_1.2
  //B:\Projects\Builds\brackeys\Build_1.2
  const reqPath = path.join(rootDir, req.path);

  if (reqPath.endsWith("gz") && fs.existsSync(reqPath)) {
    const ext = path.extname(reqPath.slice(0, -3));
    console.log(ext);
    const mimeType = mimeTypes[ext] || "application/octet-stream";

    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Vary", "Accept-Encoding");

    console.log(res.getHeaders())

    return res.sendFile(reqPath, {
        headers: {
            "Content-Encoding": "gzip"
        }
    });
  }

  next(); // Fall back to regular static serving
});

// Serve static files (non-gzipped)
app.use(express.static(rootDir));

// Fallback: serve index.html or 404
app.get("/", (req, res) => {
  const indexPath = path.join(rootDir, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📁 Serving from: ${rootDir}`);
});
