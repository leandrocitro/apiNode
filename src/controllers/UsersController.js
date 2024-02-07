const AppError = require("../utils/AppError");

class UsersController {
    create(request, response) {
        const { name, email, password, isAdmin } = request.body;

        if(!name){
            throw new AppError("Nome é obrigatório!");
        }

        response.status(201).json({ message: name, email, password, isAdmin });

    }
}

module.exports = UsersController;