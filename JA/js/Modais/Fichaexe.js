// Função para enviar os dados para o backend
function enviarDados() {
  const rua = document.getElementById('rua').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const estado = document.getElementById('estado').value;
  const numero = document.getElementById('numero').value; // Campo do número
  const cep = document.getElementById('cep').value; // Campo do CEP
  const nome = document.getElementById('nome').value; // Nome do funcionário
  const cpf = document.getElementById('cpf').value; // CPF do funcionário
  const rg = document.getElementById('rg').value; // RG do funcionário
  const celular = document.getElementById('celular').value; // Celular do funcionário
  const email = document.getElementById('email').value; // Email do funcionário
  const imagemBase64 = pictureImage.querySelector('img') ? pictureImage.querySelector('img').src : null; // Foto em Base64

  // Preparando os dados para envio
  const dados = {
    Foto: imagemBase64, 
    Nome: nome,
    Cpf: cpf,
    Rg: rg,
    Celular: celular,
    Email: email,
    Cep: cep,
    Bairro: bairro,
    Rua: rua,
    Numero: numero,
    Cidade: cidade,
    Estado: estado
  };

  // Enviar os dados para o backend via POST
  fetch('http://localhost:3000/funcionarios_internos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Dados salvos com sucesso:', data);
    alert('Dados salvos com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao salvar dados:', error);
    alert('Erro ao salvar dados!');
  });
}

// Exemplo de chamada da função ao submeter o formulário
document.querySelector('#funcionarios').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio normal do formulário
  enviarDados(); // Chama a função que envia os dados
});
