const { Router } = require("express");

const  usersRouter = require("./users.routes");
const  notesRouter = require("./notes.routes");
const  allNotesRouter = require("./allNotes.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/allNotes", allNotesRouter);



module.exports = routes;