const { Router } = require("express");
const { health } = require("../handlers/health");

const healthRouter = Router();

healthRouter.get("/", health);

module.exports = {
  healthRouter,
};
