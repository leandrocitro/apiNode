const { Router } = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const allNotesRouter = require("./allNotes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/allNotes", allNotesRouter);
routes.use("/tags", tagsRouter);
routes.use("/sessions", sessionsRouter);



module.exports = routes;