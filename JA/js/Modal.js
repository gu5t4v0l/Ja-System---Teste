document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".abrir-modal").forEach(botao => {
        botao.addEventListener("click", function () {
            let url = botao.getAttribute("data-url"); // Obtém a URL do modal
            abrirModal(url);
        });
    });
});

function abrirModal(url) {
    console.log("ABRIR  MODAL  Carregando modal de:", url);

    if (!url) {
        console.error("URL do modal não fornecida.");
        return;
    }else {
        console.log("URL do modal fornecida:", url);
        if (url.includes("Orcamento")) {
            console.log("URL do modal é de orçamento");
           
        }
    }

    fetch(url)
        .then(response => response.text())
        .then(html => {
            let modalContainer = document.getElementById("modal-container");
            modalContainer.innerHTML = html;

            let modal = modalContainer.querySelector(".modal");
            let overlay = document.getElementById("modal-overlay");

            if (modal) {
                modal.style.display = "block";
                overlay.style.display = "block";
                document.body.classList.add("modal-open");

                let closeButton = modal.querySelector('.close');
                if (closeButton) closeButton.addEventListener('click', fecharModal);

                configurarEventosEspecificos(url);
                
                // if (url.includes("Orcamento.html")) {
                //     carregarScript("http://localhost:3000/js/orcamento.js", function () {
                //         console.log("Orcamento.js carregado pelo Modal.js!");
                       
                //     });
                // }
            }
        })
        .catch(error => console.error("Erro ao carregar modal:", error));
}

function fecharModal() {
    console.log("FECHANDO  MODAL PELO MODAL.JS " );
    let modalContainer = document.getElementById("modal-container");
    let overlay = document.getElementById("modal-overlay");

    if (modalContainer) {
        modalContainer.innerHTML = "";
        // modalContainer.style.display = "none";
    }
    
    if (overlay) {
        overlay.style.display = "none";
    }

    document.body.classList.remove("modal-open");
}

function configurarEventosEspecificos(url) {
    console.log("Configurando eventos para:", url);

    if (url.includes("Orcamento")) {
        // Aguarde o carregamento do modal antes de executar as funções específicas
        setTimeout(() => {
            if (typeof configurarEventosOrcamento === "function") {
                configurarEventosOrcamento();
            } else {
                console.error("Função configurarEventosOrcamento não encontrada!");
            }
        }, 500);
    }
}
