// if (typeof Swal === "undefined") {
//     const script = document.createElement("script");
//     script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
//     script.onload = () => {
//         console.log("SweetAlert2 carregado com sucesso.");
//     };
//     document.head.appendChild(script);
// }

let FuncaoExistente = false;
let FuncaoOriginal = {
    idFuncao: "",
    descFuncao: "",
    vlrCusto: "",
    vlrVenda: ""
};

function verificaFuncao() {

    console.log("Carregando Funcao...");
    
    document.querySelector("#descFuncao").addEventListener("blur", async function () {
        const desc = this.value.trim();

        console.log("Campo descFuncao procurado:", desc);
    
        if (desc === "") return;
    
        try {
            const response = await fetch(`http://localhost:3000/funcao?descFuncao=${encodeURIComponent(desc)}`);

            
            if (!response.ok) {
                console.log("Funcao não encontrado.");
                limparFuncaoOriginal();
                FuncaoExistente = false;
                return;
            }
    
            const Funcao = await response.json();

            if (!Funcao || Object.keys(Funcao).length === 0) {
                console.log("Cliente não encontrado no corpo da resposta.");
                Swal.fire({
                    icon: 'warning',
                    title: 'Cliente não encontrado',
                    text: `Nenhum cliente com o nome fantasia "${nmFantasia}" foi encontrado.`,
                    confirmButtonText: 'Ok'
                });
                limparFuncaoOriginal();
                FuncaoExistente = false;
                return;
            }
            else{
                FuncaoExistente = true; // Define que o cliente existe 
            }
            
            if (FuncaoExistente){

                console.log("Funcao encontrado:", Funcao);
                console.log("Campos encontrados:", {
                    idFuncao: document.querySelector("#idFuncao"),
                    Custo: document.querySelector("#Custo"),
                    Venda: document.querySelector("#Venda")
                });

                // Preenche os campos com os dados retornados
                document.querySelector("#idFuncao").value = Funcao.idFuncao; // se existir o campo
                document.querySelector("#Custo").value = Funcao.vlrcusto;
                document.querySelector("#Venda").value = Funcao.vlrvenda;

                FuncaoOriginal = {
                    idFuncao: Funcao.idFuncao,
                    descFuncao: Funcao.descFuncao,
                    vlrCusto: Funcao.vlrcusto,
                    vlrVenda: Funcao.vlrvenda
                };
        
                console.log("Funcao encontrado e preenchido:", Funcao);
            }
        } catch (error) {
            console.error("Erro ao buscar Funcao:", error);
        }
    });

    const botaoEnviar = document.querySelector("#Enviar");
    const botaoPesquisar = document.querySelector("#Pesquisar");
    const form = document.querySelector("#form");

    if (!botaoEnviar || !form) {
        console.error("Formulário ou botão não encontrado no DOM.");
        return;
    }

    botaoEnviar.addEventListener("click", async function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        console.log("ENVIANDO DADOS DO Funcao PELO Funcao.JS", document);

        const idFuncao = document.querySelector("#idFuncao").value.trim();
        const descFuncao = document.querySelector("#descFuncao").value.trim();
        const vlrCusto = document.querySelector("#Custo").value.trim();
        const vlrVenda = document.querySelector("#Venda").value.trim();
    
        if (!descFuncao || !vlrCusto || !vlrVenda) {
            alert("Preencha todos os campos.");
            return;
        }
    
        // 🔍 Comparar com os valores originais
        if (
            idFuncao === FuncaoOriginal.idFuncao &&
            descFuncao === FuncaoOriginal.descFuncao &&
            vlrCusto === FuncaoOriginal.vlrCusto &&
            vlrVenda === FuncaoOriginal.vlrVenda
        ) {
            //  alert("Nenhuma alteração detectada.");
            // Swal.fire({
            //     icon: 'info', // info | success | warning | error | question
            //     title: 'Nada foi alterado!',
            //     text: 'Faça alguma alteração antes de salvar.',
            //     confirmButtonText: 'Entendi'
            // });
            mostrarAlerta();
             
            console.log("Nenhuma alteração detectada.");
            return;
        }
    
        const dados = { descFuncao, vlrCusto, vlrVenda };

        
        
    
        try {
            let response;
            console.log("idFuncao", idFuncao);
            if (idFuncao) {

                response = await fetch(`http://localhost:3000/funcao/${idFuncao}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });
            } else {
                response = await fetch("http://localhost:3000/salvarFuncao", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dados)
                });
            }
    
            const result = await response.json();
    
            if (response.ok) {
                alert(result.mensagem || "Operação realizada com sucesso!");
                form.reset();
                document.querySelector("#idFuncao").value = "";
    
                // Zera os valores antigos após salvar
                limparFuncaoOriginal();
                FuncaoExistente = false;
               
            } else {
                alert(result.erro || "Erro ao salvar o Funcao.");
            }
    
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert("Erro de conexão com o servidor.");
        }
    });

    botaoPesquisar.addEventListener("click", async function (event) {
        event.preventDefault();
        
            const campo = document.getElementById('campoCodigo');
            console.log(" clique detectado ")
            campo.classList.toggle('ativo');
    
        console.log("Pesquisando Funcao...");
        try {
            const response = await fetch("http://localhost:3000/Funcao"); // ajuste a rota conforme sua API
    
           

            if (!response.ok) throw new Error("Erro ao buscar funções");
    
            const funcoes = await response.json();
    
            const input = document.querySelector("#descFuncao");
    
            // Criar novo SELECT
            const select = document.createElement("select");
            select.id = "descFuncao";
            select.name = "descFuncao";
            select.required = true;
            select.className = "form";
            select.style.width = "100%";
            select.style.height = "40px";
            

            // Adicionar opções
            const defaultOption = document.createElement("option");
            defaultOption.text = "Selecione uma função...";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);
           
            console.log("PESQUISANDO FUNCAO:", funcoes);

            funcoes.forEach(funcao => {
                const option = document.createElement("option");
                option.value = funcao.descfuncao;
                option.text = funcao.descfuncao;
                select.appendChild(option);
            });
    
            // Substituir o input pelo select
            input.parentNode.replaceChild(select, input);
    
            // Reativar o evento blur para o novo select
            select.addEventListener("change", async function () {
                const desc = this.value.trim();
                const response = await fetch(`http://localhost:3000/funcao?descFuncao=${encodeURIComponent(desc)}`);
                if (response.ok) {
                    const funcao = await response.json();
                    document.querySelector("#idFuncao").value = funcao.idfuncao;
                    document.querySelector("#Custo").value = funcao.vlrcusto;
                    document.querySelector("#Venda").value = funcao.vlrvenda;
                    FuncaoOriginal = {
                        idFuncao: funcao.idFuncao,
                        descFuncao: funcao.descFuncao,
                        vlrCusto: funcao.vlrcusto,
                        vlrVenda: funcao.vlrvenda
                    };
                    FuncaoExistente = true;
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Função não encontrada',
                        text: `Nenhuma função com essa descrição foi encontrada.`,
                        confirmButtonText: 'Ok'
                    });
                    limparFuncaoOriginal();
                    FuncaoExistente = false;
                }
            });
    
        } catch (error) {
            console.error("Erro ao carregar funções:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível carregar as funções.',
                confirmButtonText: 'Ok'
            });
        }
    });
    

    //     // Captura os valores do formulário
    //     const descFuncao = document.querySelector("#descFuncao").value;
    //     const vlrCusto = document.querySelector("#Custo").value;
    //     const vlrVenda = document.querySelector("#Venda").value;

    //     if (!descFuncao || !vlrCusto || !vlrVenda) {
    //         console.error("❌ Campos do formulário não encontrados!");
    //         alert("Erro: campos do formulário não foram carregados corretamente.");
    //         return;
    //     }
    //     const dados = { descFuncao, vlrCusto, vlrVenda };
    //     console.log("enviando", dados);

    //     try {
    //         const response = await fetch("http://localhost:3000/Funcao", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(dados),
    //         });

    //         const result = await response.json();

    //         if (result.success) {
    //             alert("Dados enviados com sucesso!");
    //             form.reset(); // Limpa o formulário
    //         } else {
    //             alert("Erro ao enviar os dados.");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao enviar:", error);
    //         alert("Erro de conexão com o servidor.");
    //     }
    // });
}

function limparFuncaoOriginal() {
    FuncaoOriginal = {
        idFuncao: "",
        descFuncao: "",
        vlrCusto: "",
        vlrVenda: ""
    };
}
function mostrarAlerta() {
    Swal.fire({
        icon: 'info',
        title: 'Nada foi alterado!',
        text: 'Faça alguma alteração antes de salvar.',
        confirmButtonText: 'OK',

        didOpen: () => {
            const confirmBtn = Swal.getConfirmButton();
            if (confirmBtn) confirmBtn.focus();
          }
    });
}

function configurarEventosFuncao() {
    console.log("Configurando eventos Funcao...");
    verificaFuncao(); // Carrega os Funcao ao abrir o modal
    console.log("Entrou configurar Funcao no FUNCAO.js.");
    

} 
window.configurarEventosFuncao = configurarEventosFuncao;



