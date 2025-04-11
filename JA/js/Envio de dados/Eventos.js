document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#Enviar").addEventListener("click", async function (event) {
      event.preventDefault(); // Previne o envio padrão do formulário

      // Captura os valores do formulário
      
      const nmEvento = document.querySelector("#nmEvento").value;

      // Criar objeto com os dados
      const dados = { nmEvento };
      console.log("enviando", dados);

      try {
          const response = await fetch("http://localhost:3000/eventos", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(dados),
          });

          const result = await response.json();

          if (result.success) {
              alert("Dados enviados com sucesso!");
              document.querySelector("#form").reset(); // Limpa o formulário
          } else {
              alert("Erro ao enviar os dados.");
          }
      } catch (error) {
          console.error("Erro ao enviar:", error);
          alert("Erro de conexão com o servidor.");
      }
  });
});


