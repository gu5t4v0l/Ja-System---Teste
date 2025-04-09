const inputFile = document.querySelector("#pictureInput");
const pictureImage = document.querySelector(".pictureImage");
const pictureImageTxt = "Foto 3x4";


pictureImage.innerText = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
  const inputTarget = e.target;
  const file = inputTarget.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("pictureImage");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerText = pictureImageTxt;
  }
});



// ---------------------------------------  Autocomplete Cep -------------------------------------------------------------//
function formatCEP(input) {
  let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (value.length > 5) {
      input.value = value.substring(0, 5) + '-' + value.substring(5, 8); // Aplica a formatação do CEP
  } else {
      input.value = value;
  }

  if (value.length === 8) {
      buscarCEP(value); // Chama a função para buscar o endereço
  } else {
      esconderEndereco();
  }
}

function buscarCEP(cep) {
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.erro) {
              mostrarErro();
              return;
          }
          preencherEndereco(data);
      })
      .catch(() => mostrarErro());
}

function preencherEndereco(data) {
  document.getElementById('Rua').value = data.logradouro || '';
  document.getElementById('Bairro').value = data.bairro || '';
  document.getElementById('Cidade').value = data.localidade || '';
  document.getElementById('Estado').value = data.uf || '';

  document.getElementById('mensagemErro').style.display = 'none'; // Esconde a mensagem de erro
}

function mostrarErro() {
  esconderEndereco();
  document.getElementById('mensagemErro').style.display = 'block'; // Mostra a mensagem de erro
}

function esconderEndereco() {
  document.getElementById('mensagemErro').style.display = 'none';
}



// --------------------------------------------------------------------------- Formatação Cpf e RG --------------------------------------------------------------------------------------------------
// Formatação CPF (###.###.###-##)
function formatCPF(input) {
  let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (value.length > 3 && value.length <= 6) {
      input.value = value.substring(0, 3) + '.' + value.substring(3);
  } else if (value.length > 6 && value.length <= 9) {
      input.value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6);
  } else if (value.length > 9) {
      input.value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
  } else {
      input.value = value;
  }

  // Quando atingir 11 números, valida o CPF
  if (value.length === 11) {
    if (!validarCPF(value)) {
        alert("CPF inválido! Verifique os números digitados.");
        input.value = ''; // Limpa o campo
    }
} else if (value.length > 11) {
    alert("CPF inválido! O CPF deve conter 11 dígitos.");
    input.value = ''; // Limpa o campo
}
}

// Validação de CPF
function validarCPF(cpf) {
  let sum = 0, remainder;

  if (cpf == "00000000000") return false;

  for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder == 10 || remainder == 11) remainder = 0;
  if (remainder != parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf[i - 1]) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder == 10 || remainder == 11) remainder = 0;
  if (remainder != parseInt(cpf[10])) return false;

  return true;
}


// Formatação RG (##.###.###-#) com validação e alert
function formatRG(input) {
  let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (value.length > 2) {
      value = value.substring(0, 2) + '.' + value.substring(2);
  }
  if (value.length > 6) {
      value = value.substring(0, 6) + '.' + value.substring(6);
  }
  if (value.length > 10) {
      value = value.substring(0, 10) + '-' + value.substring(10, 11);
  }

  input.value = value;
}

// Validação de RG só quando o usuário sair do campo
function validarRG(input) {
  let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (value.length < 7 || value.length > 9) {
      alert("RG inválido! O RG deve conter entre 7 e 9 dígitos.");
      input.value = ''; // Limpa o campo
  }
}



//  --------------------------------------------    Formatação celular   ----------------------------------------------------------//

// Formatação de Celular (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
function formatCelular(input) {
  let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

  if (value.length > 2 && value.length <= 6) {
      input.value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
  } else if (value.length > 6 && value.length <= 10) {
      input.value = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
  } else if (value.length > 10) {
      input.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
  } else {
      input.value = value;
  }
}
