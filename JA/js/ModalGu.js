function abrirModal(url) { 
    console.log("Tentando carregar modal de:", url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            let modalContainer = document.getElementById("modal-container");
            modalContainer.innerHTML = html; // Carrega o conteúdo HTML no modal

            let modal = modalContainer.querySelector(".modal"); // Obtém o modal dentro do container
            let overlay = document.getElementById("modal-overlay"); // Obtém o overlay

            if (modal) {
                modal.style.display = "block"; // Torna o modal visível
                overlay.style.display = "block"; // Torna o fundo escuro visível
                document.body.classList.add("modal-open"); // Adiciona a classe para liberar a visualização
                console.log("Modal carregado e exibido com sucesso!");

                inicializarMoeda();

                let closeButton = modal.querySelector('.close'); // 🔹 Alteração 1: Busca dentro do modal
                if (closeButton) {
                    closeButton.addEventListener('click', fecharModal);
                } else {
                    console.error("Erro: Botão de fechar ('.close') não encontrado no modal.");
                }

                // Captura o formulário e adiciona o evento de envio
                let form = modal.querySelector("#form");
                if (form) {
                    form.addEventListener("submit", function(event) {
                        event.preventDefault();


                        document.addEventListener("click", function(event) {
                            if (event.target.classList.contains("Limpar")) { // Se o botão clicado tem a classe "Limpar"
                                let inputs = document.querySelectorAll(".modal input"); // Seleciona TODOS os inputs de TODOS os modais
                                inputs.forEach(input => input.value = ""); // Limpa os valores dos inputs
                            }
                        });

                let Pesquisar = document.querySelector("#search");
                let idMontagem = document.querySelector("#iDMontagem");

                Pesquisar.addEventListener("click", function() {
                    if (!idMontagem) {
                        console.error("Erro: Elemento idMontagem não encontrado!");
                        return;
                    }

                    console.log("Tentando carregar o campo de pesquisa...");

                    if (idMontagem.style.display === "none" || idMontagem.style.display === "") {
                        idMontagem.style.display = "block";
                        console.log("Campo de pesquisa carregado com sucesso!");
                    } else {
                        idMontagem.style.display = "none";
                        console.log("Campo de pesquisa ocultado.");
                    }
                });



                        let cargoData = {
                            descCargo: modal.querySelector("#descCargo").value,
                            Custo: modal.querySelector("#ctoCusto").value,
                            Venda: modal.querySelector("#vdaVenda").value,
                        };

                        fetch("http://localhost:3000/cargo", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(cargoData)
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Formulário enviado com sucesso!", data);
                            fecharModal(); // Fecha o modal após o envio
                        })
                        .catch(error => console.error("Erro ao enviar formulário:", error));
                    });
                } else {
                    console.error("Erro: Formulário não encontrado.");
                }
            } else {
                console.error("Erro: Modal não encontrado no HTML carregado.");
            }
        })
        .catch(error => console.error("Erro ao carregar modal:", error));
}


document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("input", function(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            event.target.value = event.target.value.toUpperCase();
        }
    });
});
// Função para fechar o modal
function fecharModal() {
    let modalContainer = document.getElementById("modal-container");
    let overlay = document.getElementById("modal-overlay");

    if(modalContainer){
    modalContainer.innerHTML = ""; // Remove o conteúdo do modal 
    }

    if (overlay){
    overlay.style.display = "none"; // Esconde o fundo escuro
    }

    document.body.classList.remove("modal-open");
    history.back(); // Libera a rolagem e interações
}


