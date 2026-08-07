function criarMensagem(profissional) {
    return `${profissional.nome} estuda ${profissional.horasDeEstudoPorDia} horas por dia para evoluir para ${profissional.objetivo}.`;
}

module.exports = criarMensagem;