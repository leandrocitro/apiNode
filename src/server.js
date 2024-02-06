const express = require('express'); //Importação do Express

const app = express(); //Inicialização do Express
app.use(express.json());

 /* app.get("/message/:id/:user", (request, response) => { //Request Params
const { id, user } = request.params; 

    response.send(`
    Id da mensagem: ${id}.
    Para o usuário: ${user}.

`);
}); */

app.post("/users", (request, response) => {
    const { name, email, password } = request.body;
        
    response.send(`Usuário: ${name} - email: ${email} - password: ${password}`);
})

const PORT = 3333; //Criação de uma constante para definir a porta 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); 