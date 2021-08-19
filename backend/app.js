// dependices
const express = require("Express");
const cors = require("cors");
var app = express();

// local dependices
const subprocessor = require("./routes/subpreocessor.router");

const useMiddlewares = (server) => {
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};

const createServer = () => {
  const server = express();
  useMiddlewares(server);
  server.use("/subprocessor", subprocessor);
  return server;
};

module.exports = app = createServer();
