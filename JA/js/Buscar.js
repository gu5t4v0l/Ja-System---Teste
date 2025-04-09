$(document).ready(function () {
    $("#mostrar-campo").click(function () {
      $("#campo-pesquisa").show();
    });
  
    $("#buscar").click(function () {
      let codigo = $("#codigo").val();
  
      $.ajax({
        url: "http://localhost:3000/clientes", // Se quiser, posso te ajudar a tornar essa URL dinâmica
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ codigo: codigo }),
        success: function (data) {
          if (data.sucesso) {
            preencherCampos(data);
          } else {
            alert("Código não encontrado!");
          }
        },
        error: function () {
          alert("Erro ao buscar o código!");
        }
      });
    });
  
    function preencherCampos(data) {
      const campos = {
        nmFantasia: data.nome_fantasia,
        razaoSocial: data.razao_social,
        cnpj: data.cnpj,
        Nome: data.nome_responsavel,
        celContato: data.celular,
        email: data.email,
        emailNFE: data.email_nfe,
        site: data.site,
        inscEstadual: data.ie,
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        pais: data.pais
      };
  
      for (let id in campos) {
        const $campo = $("#" + id);
        if ($campo.length) {
          $campo.val(campos[id]);
        }
      }
    }
  });
  