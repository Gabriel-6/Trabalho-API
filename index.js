require('dotenv').config()

const express = require('express')
const rotasPadrao = require('./rotas/index.js')
const rotastarefas = require('./rotas/tarefas.js')
const app = express()

app.use(express.json())
app.use(rotasPadrao)
app.use(rotastarefas)

app.listen(process.env.PORTA || 3000, () => {
    console.log("API rodando")
})