const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const allNotesRoutes = Router();

const notesController = new NotesController;

allNotesRoutes.get("/", notesController.AllNotes);



module.exports = allNotesRoutes;