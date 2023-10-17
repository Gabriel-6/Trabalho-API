const Router = require("express").Router()
const repositorio = require("../repositorios/tarefas").repositoriotarefas()

Router.get("/tarefas/:id", (req, res) => {
    try{
        const {id} = req.params
        const tarefa = repositorio.get(id)

        res.send(tarefa)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
})

Router.get("/tarefas", (req, res) => {
    const parametros = {}

    if(req.query.nome){
        parametros.nome = req.query.nome
    }

    const tarefas = repositorio.getAll(parametros)

    res.send(tarefas)
})

Router.post("/tarefas", (req, res) => {
    try{
        const dados = req.body

        const tarefa_cadastrada = repositorio.create(dados)

        res.send(tarefa_cadastrada)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
    
})

Router.put("/tarefas/:id", (req, res) => {
    try{
        const {id} = req.params
        const dados = req.body

        const tarefa_atualizada = repositorio.update(dados, id)

        res.send(tarefa_atualizada)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
})

Router.delete("/tarefas/:id", (req, res) => {
    try{
        const {id} = req.params
        repositorio.destroy(id)

        res.status(204).send()
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
})

Router.patch("/tarefas/:id", (req, res) => {
    try {
      const {id} = req.params
  
      const tarefa = repositorio.buscarTarefa(id)
  
      tarefa.nome = req.body.nome ?? tarefa.nome
      tarefa.status = req.body.status ?? tarefa.status
      tarefa.descricao = req.body.descricao ?? tarefa.descricao
  
      const tarefa_atualizada = repositorio.update(tarefa, id)
      res.send(tarefa_atualizada)
    } catch (err) {
      const dadosDoErro = JSON.parse(err.message)
      res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
  })

module.exports = Router