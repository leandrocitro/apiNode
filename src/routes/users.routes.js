const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserAvatarController = require("../controllers/UserAvatarController");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);


function myMiddleware(request, response, next) { //Criando o Middleware
    console.log("Você passou pelo middleware");
    

     if (!request.body.isAdmin) {
        return response.json({ message: "User unautorized" });
    } 

    next();

} 


const usersController = new UsersController;
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", myMiddleware, usersController.create); //Utilizando o Middleware
usersRoutes.get("/", usersController.listUsers);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/:id", usersController.delete);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

   

module.exports = usersRoutes;