const express = require("express");
const app = express();

const pastesRouter = require("./pastes/pastes.router");
// TODO: Follow instructions in the checkpoint to implement ths API.

const pastes = require("./data/pastes-data");

// built-in middleware that adds a body property to the request (req.body). The req.body request will contain the parsed data—or it will return an empty object ({}) if there was no body to parse, the Content-Type wasn't matched, or an error occurred
app.use(express.json())




///pastes router
app.use("/pastes", pastesRouter);



// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
