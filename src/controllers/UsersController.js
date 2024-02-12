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

    async update(request, response){
        const { name, email } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("select * from users where id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdatedEmail = await database.get("select * from users where email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Esse e-mail já está em uso.");
        }

        user.name = name;
        user.email = email;

        await database.run(`
            update users set
            name = ?,
            email = ?,
            updated_at = ?
            where id = ?`,
            [user.name, user.email, new Date(), id]
            );

            return response.json("Update realizado com sucesso!");
    }

    async delete(request, response){
        const { id } = request.params;

        const database = await sqliteConnection();

        const user = await database.get("select * from users where id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado");
        } else {
            await database.run(`
            delete from users where id = ?`, [id]);
            return response.json("Usuário deletado com sucesso!")
        }

        
    }

    
}

module.exports = UsersController;