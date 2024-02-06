const express = require('express'); //Importação do Express

const routes = require("./routes/")

const app = express(); //Inicialização do Express
app.use(express.json());

app.use(routes);

const PORT = 3333; //Criação de uma constante para definir a porta 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); 