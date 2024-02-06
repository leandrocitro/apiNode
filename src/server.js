const express = require('express'); //Importação do Express

const app = express(); //Inicialização do Express

app.get("/message/:id/:user", (request, response) => {
const { id, user } = request.params;

    response.send(`
    Id da mensagem: ${id}.
    Para o usuário: ${user}.

`);
});

const PORT = 3333; //Criação de uma constante para definir a porta 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); 