const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();


function myMiddleware(request, response, next) { //Criando o Middleware
    console.log("Você passou pelo middleware");
    

    if (!request.body.isAdmin) {
        return response.json({ message: "User unautorized" });
    } 

    next();

}


const usersController = new UsersController;

usersRoutes.post("/", myMiddleware, usersController.create); //Utilizando o Middleware

module.exports = usersRoutes;