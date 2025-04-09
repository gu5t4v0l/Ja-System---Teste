$("#funcionarios").on("submit", function (e) {
  e.preventDefault(); // Impede envio padrão

  const dados = {
    nome_fantasia: $("#nmFantasia").val(),
    razao_social: $("#razaoSocial").val(),
    cnpj: $("#cnpj").val(),
    nome_responsavel: $("#Nome").val(),
    celular: $("#celContato").val(),
    email: $("#email").val(),
    email_nfe: $("#emailNFE").val(),
    site: $("#site").val(),
    inscEstadual: $("#inscEstadual").val(),
    cep: $("#cep").val(),
    rua: $("#rua").val(),
    numero: $("#numero").val(),
    complemento: $("#complemento").val(),
    bairro: $("#bairro").val(),
    cidade: $("#cidade").val(),
    estado: $("#estado").val(),
    pais: $("#pais").val()
  };

  $.ajax({
    url: "http://localhost:3000/clientes/inserir",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dados),
    success: function (res) {
      if (res.success) {
        alert("✅ Cliente cadastrado com sucesso!");
      } else {
        alert("⚠️ Erro ao cadastrar cliente.");
      }
    },
    error: function (err) {
      console.error(err);
      alert("❌ Erro ao conectar com o servidor.");
    }
  });
});
