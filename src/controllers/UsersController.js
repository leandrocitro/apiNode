const { hash, compare } = require("bcryptjs");

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
        const { name, email, password, old_password } = request.body;
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

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if( password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            update users set
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            where id = ?`,
            [user.name, user.email, user.password, id]
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