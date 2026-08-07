function calcularHorasSemanais(horasPorDia, diasPorSemana) {
  return horasPorDia * diasPorSemana;
}

function calcularHorasQuatroSemanas(horasSemanais) {
  return horasSemanais * 4;
}

function verificarMetaSemanal(horasSemanais, meta = 12) {
  return horasSemanais >= meta;
}

module.exports = {
  calcularHorasSemanais,
  calcularHorasQuatroSemanas,
  verificarMetaSemanal,
};