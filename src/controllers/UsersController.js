const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqlConnection = require ("../database/sqlite");
const sqliteConnection = require("../database/sqlite");
const { addListener } = require("nodemon");

class UsersController {

    async create(request, response) {
        const { name, email, password, isAdmin } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("select * from users where email = (?)", [email]);
    
        if(checkUserExists){
            throw new AppError("Este e-mail já está cadastrado.")
        }

        const hashedPassword = await hash(password, 8);
        
        await database.run(
            "insert into users (name, email, password, isAdmin) values (?,?,?,?)",
            [name, email, hashedPassword, isAdmin]
        );

        return response.status(201).json('Usuário cadastrado com sucesso!');

    }


    async listUsers(request, response){
                
        const database = await sqlConnection();
        const listUsers  = await database.get("select * from users");
        
        return response.json(listUsers);
    }
}



module.exports = UsersController;