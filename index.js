const express = require("express");
const jsonServer = require("json-server");
const server = express(); // Using express instead of json-server directly
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(middlewares);
server.use("/api", router); // Mounting JSON Server router under /api

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = require("./db.json");
  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res
      .status(200)
      .json({ message: "Login successful", user, accessToken: "token" });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
