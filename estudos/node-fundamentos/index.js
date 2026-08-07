// index.js (localizado na raiz de node-fundamentos)
const profissional = require('./src/dados');
const criarMensagem = require('./src/mensagem');
const {
  calcularHorasSemanais,
  calcularHorasQuatroSemanas,
  verificarMetaSemanal,
} = require('./src/calculadora');

const diasDeEstudo = 6;
const horasSemanais = calcularHorasSemanais(
  profissional.horasDeEstudoPorDia,
  diasDeEstudo
);
const horasQuatroSemanas = calcularHorasQuatroSemanas(horasSemanais);
const metaAtingida = verificarMetaSemanal(horasSemanais);

console.log(criarMensagem(profissional));
console.log(`Carga semanal planejada: ${horasSemanais} horas.`);
console.log(`Total em 4 semanas: ${horasQuatroSemanas} horas.`);

if (metaAtingida) {
  console.log('Meta semanal atingida.');
} else {
  console.log('Meta semanal não atingida.');
}