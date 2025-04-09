let tipoAtual = 'clientes';

function alternarTipo() {
  tipoAtual = tipoAtual === 'clientes' ? 'eventos' : 'clientes';
  document.getElementById('titulo-painel').textContent = tipoAtual.charAt(0).toUpperCase() + tipoAtual.slice(1);
  carregarDados(tipoAtual);
}

async function carregarDados(tipo) {
  try {
    const resposta = await fetch(`http://localhost:3000/api/${tipo}`);
    const json = await resposta.json();

    if (!json.success || !json.data) {
      console.error("Erro ao buscar dados:", json.erro || 'Sem dados');
      return;
    }

    const dados = json.data;

    const ul = document.getElementById('lista-dados');
    ul.innerHTML = '';

    dados.forEach(item => {
      const li = document.createElement('li');
      li.textContent = tipo === 'clientes' ? item.nmfantasia : item.titulo;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}


window.onload = () => carregarDados(tipoAtual);

