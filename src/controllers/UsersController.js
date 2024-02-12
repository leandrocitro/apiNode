const AppError = require("../utils/AppError");

const sqlConnection = require ("../database/sqlite");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const { name, email, password, isAdmin } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("select * from users whete email = (?)" [email]);

        if(checkUserExists){
            throw new AppError("Este e-mail já está cadastado.")
        }

        return response.status(201).json();

    }
}

module.exports = UsersController;