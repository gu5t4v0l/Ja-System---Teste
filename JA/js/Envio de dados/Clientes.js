document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#Enviar").addEventListener("click", async function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Captura os valores do formulário
        
        const nome_fantasia = document.querySelector("#nmFantasia").value;
        const razao_social = document.querySelector("#razaoSocial").value;
        const cnpj = document.querySelector("#cnpj").value;
        const nome_responsavel = document.querySelector("#nmResponsavel").value;
        const celContato = document.querySelector("#celContato").value;
        const email = document.querySelector("#email").value;
        const email_nfe = document.querySelector("#emailNFE").value;
        const site = document.querySelector("#site").value;
        const inscEstadual = document.querySelector("#inscEstadual").value;
        const cep = document.querySelector("#cep").value;
        const rua = document.querySelector("#rua").value;
        const numero = document.querySelector("#numero").value;
        const complemento = document.querySelector("#complemento").value;
        const bairro = document.querySelector("#bairro").value;
        const cidade = document.querySelector("#cidade").value;
        const estado = document.querySelector("#estado").value;
        const pais = document.querySelector("#pais").value;

        // Criar objeto com os dados
        const dados = { nome_fantasia, razao_social, cnpj, nome_responsavel, celContato, email, email_nfe, site, inscEstadual, cep, rua, numero, complemento, bairro, cidade, estado, pais};
        console.log("enviando", dados);

        try {
            const response = await fetch("http://localhost:3000/clientes", {
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

