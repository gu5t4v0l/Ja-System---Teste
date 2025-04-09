let tipoAtual = 'clientes';

window.onload = () => {
  document.getElementById('painel-clientes').classList.remove('hidden'); // Garante que "clientes" esteja visível
  carregarDados(tipoAtual); // Carrega os dados iniciais
};

function alternarTipo() {
  const painelClientes = document.getElementById('painel-clientes');
  const painelEventos = document.getElementById('painel-eventos');
  const seta = tipoAtual === 'clientes'
    ? painelClientes.querySelector('.seta')
    : painelEventos.querySelector('.seta');

  seta.classList.add('rotate');

  setTimeout(() => {
    painelClientes.classList.toggle('hidden');
    painelEventos.classList.toggle('hidden');

    tipoAtual = tipoAtual === 'clientes' ? 'eventos' : 'clientes';

    seta.classList.remove('rotate');
    carregarDados(tipoAtual); // Só carrega dados depois que trocou visualmente
  }, 300);
}
