let tipoAtual = 'clientes';

function alternarTipo() {
  tipoAtual = tipoAtual === 'clientes' ? 'eventos' : 'clientes';
  document.getElementById('titulo-painel').textContent = tipoAtual.charAt(0).toUpperCase() + tipoAtual.slice(1);

  const seta = document.getElementById('seta-toggle');
  seta.style.transform = tipoAtual === 'eventos' ? 'rotate(180deg)' : 'rotate(0deg)';

  carregarDados(tipoAtual);
}

function carregarDados(tipo) {
  const lista = document.getElementById("lista-dados");
  lista.innerHTML = "";

  // Simulando dados do banco (só pra testar)
  const dadosFake = tipo === 'clientes'
    // ? ['Maria', 'João', 'Carlos']
    // : ['Evento X', 'Evento Y', 'Evento Z'];

  dadosFake.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });
}

document.getElementById('seta-toggle').addEventListener('click', alternarTipo);
carregarDados(tipoAtual);
