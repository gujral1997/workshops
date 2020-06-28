const cluster = require("cluster");
process.env.UV_THREADPOOL_SIZE = 1;

if (cluster.isMaster) {
  // Will make index.js to get executed again in child mode
  cluster.fork();
} else {
  // Child
  const crypto = require("crypto");
  const express = require("express");
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }
  const app = express();
  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hello!");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000);
}
