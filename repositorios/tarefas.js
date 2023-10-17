let tarefas = [
    {
        nome: "Tarefa 1",
        status: "Feito",
        descricao: "Tarefa 1",
        id: 1
    }
]

let ultimo_id = 1
const validacao = require("../validacoes/tarefas")

const repositorio = () => {
    return {
        buscarTarefa: (id) => {
            let tarefas_filtradas = tarefas.filter(usuario => {
                return usuario.id == id
            })
            
            if(tarefas_filtradas.length == 0) {
                throw new Error(JSON.stringify({
                    status: 404,
                    message: "Tarefa não encontrada"
                }))
            }
        
            return tarefas_filtradas[0]
        },

        getAll: (params) => {
            const listaDeParametros = Object.keys(params)

            const tarefas_filtradas = tarefas.filter(cat => {
                let deveRetornar = true

                listaDeParametros.forEach(parametro => {
                    if(!cat[parametro].includes(params[parametro])){
                        deveRetornar = false
                    }
                })

                return deveRetornar
            })

            return tarefas_filtradas
        },

        get: (id) => {
            const tarefas_filtradas = tarefas.filter(cat => {
                return cat.id == id
            })

            if(tarefas_filtradas.length == 0){
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: ""
                }))
            }

            return tarefas_filtradas[0]
        },

        create: (dados) => {
            if(validacao(dados)){
                const tarefa = dados

                tarefa.id = ++ultimo_id

                tarefas.push(tarefa)

                return tarefa
            }else{
                throw new Error(JSON.stringify({
                    status: 400,
                    mensagem: "Dados incorretos para cadastrar."
                }))
            }
        },

        update: (dados, id) => {
            if (validacao(dados)) {
              const tarefas_filtradas = tarefas.filter(cat => {
                return cat.id == id;
              });
          
              if (tarefas_filtradas.length == 0) {
                throw new Error(JSON.stringify({
                  status: 404,
                  mensagem: ""
                }));
              }
          
              const tarefa = tarefas_filtradas[0];
          
              tarefa.nome = dados.nome;
              tarefa.descricao = dados.descricao;
          
              return tarefa;
        }else{
                throw new Error(JSON.stringify({
                    status: 400,
                    mensagem: "Dados incorretos para atualizar."
                }))
            }
        },

        destroy: (id) => {
            const tarefas_filtradas = tarefas.filter(cat => {
                return cat.id == id
            })

            if(tarefas_filtradas.length == 0){
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: ""
                }))
            }

            tarefas = tarefas.filter(cat => {
                return cat.id != id
            })
        },

        
    }
}

module.exports = {
    repositoriotarefas: repositorio
}