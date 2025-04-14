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

            let script = null;

            if (url.includes("ModalClientes")) {
                script = document.createElement("script");
                script.src = "js/Clientes.js";
            } else if (url.includes("CadFuncao")) {
                script = document.createElement("script");
                script.src = "js/Funcao.js";
            } else if (url.includes("Orcamento")) {
                script = document.createElement("script");
                script.src = "js/Orcamento.js";
            }

            if (script) {
                script.defer = true;
                script.onload = () => {
                    configurarEventosEspecificos(url); // só chama depois que o JS carregar
                };
                document.body.appendChild(script);
            }

            let modal = modalContainer.querySelector(".modal");
            let overlay = document.getElementById("modal-overlay");

            if (modal) {
                modal.style.display = "block";
                overlay.style.display = "block";
                document.body.classList.add("modal-open");

                let closeButton = modal.querySelector('.Close');
                if (closeButton) closeButton.addEventListener('click', fecharModal);

                configurarEventosEspecificos(url);
                
                
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
        // overlay.style.display = "none";
    }

    document.body.classList.remove("modal-open");
}

function configurarEventosEspecificos(url) {
    console.log("Modal.js - Configurando eventos para:", url);

    const rotas = [
        { keyword: "Orcamento", func: configurarEventosOrcamento },
        { keyword: "CadFuncao", func: configurarEventosFuncao },
       // { keyword: "Equipamentos", func: configurarEventosEquipamentos },
       // { keyword: "Suprimentos", func: configurarEventosSuprimentos },
       // { keyword: "Montagem", func: configurarEventosMontagem },
        { keyword: "ModalClientes", func: configurarEventosClientes },
    ];

    rotas.forEach(({ keyword, func }) => {
        if (url.includes(keyword)) {
            setTimeout(() => {
                if (typeof func === "function") {
                    console.log(`Chamando ${func.name}()`);
                    func();
                } else {
                    console.error(`Função ${func.name} não encontrada!`);
                }
            }, 500);
        }
    });

    // if (url.includes("Orcamento")) {
    //     // Aguarde o carregamento do modal antes de executar as funções específicas
    //     setTimeout(() => {
    //         if (typeof configurarEventosOrcamento === "function") {
    //             configurarEventosOrcamento();
    //         } else {
    //             console.error("Função configurarEventosOrcamento não encontrada!");
    //         }
    //     }, 500);
    // }
   
    //  if (url.includes("CadCargo")) {
    //     console.log("Modal.js - Configurando eventos para Cargos");
    //     // Aguarde o carregamento do modal antes de executar as funções específicas
    //     setTimeout(() => {
    //         if (typeof configurarEventosCargos === "function") {
    //             console.log("Chamando configurarCargos() no Modal.js");
    //             configurarEventosCargos();
    //         } else {
    //             console.error("Função configuraEventosCargos não encontrada!");
    //         }
    //     }, 500);
    // }  

    // if (url.includes("Equipamentos")) {
    //     // Aguarde o carregamento do modal antes de executar as funções específicas
    //     setTimeout(() => {
    //         if (typeof configurarEventosEquipamentos === "function") {
    //             configurarEventosEquipamentos();
    //         } else {
    //             console.error("Função configurarEventosEquipamentos não encontrada!");
    //         }
    //     }, 500);
    // }
    // if (url.includes("Suprimentos")) {
    //     // Aguarde o carregamento do modal antes de executar as funções específicas
    //     setTimeout(() => {
    //         if (typeof configurarEventosSuprimentos === "function") {
    //             configurarEventosSuprimentos();
    //         } else {
    //             console.error("Função configurarEventosSuprimentos não encontrada!");
    //         }
    //     }, 500);
    // }
    // if (url.includes("Montagem")) {
    //     // Aguarde o carregamento do modal antes de executar as funções específicas
    //     setTimeout(() => {
    //         if (typeof configurarEventosMontagem === "function") {
    //             configurarEventosMontagem();
    //         } else {
    //             console.error("Função configurarEventosMontagem não encontrada!");
    //         }
    //     }, 500);
    // }
    // if (url.includes("Clientes")) {
    //     // Aguarde o carregamento do modal antes de executar as funções específicas
    //     setTimeout(() => {
    //         if (typeof configurarEventosClientes === "function") {
    //             configurarEventosClientes();
    //         } else {
    //             console.error("Função configurarEventosClientes não encontrada!");
    //         }
    //     }, 500);
    // }  
   


}