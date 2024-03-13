const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsCotroller = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsCotroller.create);

module.exports = sessionsRoutes;