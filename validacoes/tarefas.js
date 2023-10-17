termos = ["Feito", "Fazendo", "A Fazer"]

const validar = (dados) => {
    if(!(dados.nome && dados.nome.length > 0 && dados.nome != "" &&
         dados.status && dados.status.length > 0 && termos.includes(dados.status) &&
         dados.descricao && dados.descricao.length > 0 && dados.descricao != ""
         )){
        return false
    }else{
        return true
    }
}

module.exports = validar