// create the express server here

require("dotenv").config();

const { PORT = 3000 } = process.env;

const express = require("express");
const server = express();

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
