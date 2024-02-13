const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();
const allNotesRoutes = Router();


/* function myMiddleware(request, response, next) { //Criando o Middleware
    console.log("Você passou pelo middleware");
    

     if (!request.body.isAdmin) {
        return response.json({ message: "User unautorized" });
    } 

    next();

} */


const notesController = new NotesController;

notesRoutes.post("/:user_id", notesController.create); 

notesRoutes.get("/:id", notesController.show);

//allNotesRoutes.get("/", notesController.AllNotes);

notesRoutes.delete("/:id", notesController.delete);

notesRoutes.get("/", notesController.index);


module.exports = notesRoutes;