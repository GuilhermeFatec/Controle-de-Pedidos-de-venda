const { response, application, request } = require('express')
const express = require('express')
const app = express()
require('dotenv').config() //Carregar as várias portas
const inicializaMongoServer = require('./config/db')
const rotasPedido = require("./routes/pedido")
inicializaMongoServer() //Inicializando MongoDB

const PORT = process.env.PORT
app.use(express.json()) // Definindo que o Backend fará o PARSE do JSON

//Definindo a primeira rota

app.get("/", (require, response) => {
    response.json({
        mensagem: "🚀 API 100% funcionando!",
        versao: "1.0.0"
    })
})

//Rotas do meu App
app.use("/pedidos",rotasPedido)


//Rota para tratar erros

app.use(function (request, response) {
    response.status(404).json({
        mensagem: `A rota ${request.originalUrl} não existe`
    })
})



//Carregando o server WEB

app.listen(PORT, (request, response) => {
    console.log(`🚀Servidor web rodando na porta ${PORT} !`)
})
