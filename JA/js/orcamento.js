document.addEventListener("DOMContentLoaded", function () {
    console.log("Script orcamento.js carregado.");
   // configurarEventosOrcamento()
    carregarLocalMont();

});

// Função para carregar os cargos
function carregarCargos() {
    console.log("Função carregarCargos chamada");
    fetch('http://localhost:3000/cargos')
        .then(response => response.json())
        .then(cargos => {
            let selects = document.querySelectorAll(".idCargo");
            selects.forEach(select => {
                select.innerHTML = '<option value="">Selecione um cargo</option>';
                cargos.forEach(cargo => {
                    let option = document.createElement("option");
                    option.value = cargo.idcargo;
                    option.textContent = cargo.desccargo;
                    option.setAttribute("data-desccargo", cargo.desccargo);
                    option.setAttribute("data-cto", cargo.vlrcusto);
                    option.setAttribute("data-vda", cargo.vlrvenda);
                    select.appendChild(option);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar cargos:', error));
}

// Função para carregar os equipamentos
function carregarEquipamentos() {

    console.log("Função carregarEquipamentos chamada");
    fetch('http://localhost:3000/equipamentos')
        .then(response => response.json())
        .then(equipamentos => {
            let selects = document.querySelectorAll(".idEquipamento");
            selects.forEach(select => {
                select.innerHTML = '<option value="">Selecione um Equipamento</option>';
                equipamentos.forEach(equipamentos => {
                    let option = document.createElement("option");
                    option.value = equipamentos.idcargo;
                    option.textContent = cargo.desccargo;
                    option.setAttribute("data-desccargo", equipamentos.desccargo);
                    option.setAttribute("data-cto", equipamentos.vlrcusto);
                    option.setAttribute("data-vda", equipamentos.vlrvenda);
                    select.appendChild(option);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar equipamentos:', error));
}

// Função para carregar os locais de montagem
function carregarLocalMont() {
    
    console.log("Função carregar LocalMontagem chamada");
    fetch('http://localhost:3000/localmontagem')
    .then(response => response.json())
    .then(montagem => {
        console.log('Local Montagem recebidos:', montagem);
        
        let selects = document.querySelectorAll(".idMontagem");
        if (selects.length === 0) {
            console.error('Nenhum elemento com a classe "idMontagem" encontrado.');
            return;
        }else{
            console.log('Elementos encontrados com a classe "idMontagem":', selects.length);
        }
        selects.forEach(select => {
            // select.innerHTML = '';  // Limpar as opções anteriores

            // // Adiciona a opção "Selecione um local de montagem"
            // let defaultOption = document.createElement("option");
            // defaultOption.value = "";
            // defaultOption.textContent = "Selecione um Local de Montagem";
            // select.appendChild(defaultOption);

            // Adiciona as opções de Local de Montagem
            select.innerHTML = '<option value="">Selecione um Local de Montagem</option>'; // Adiciona a opção padrão
            montagem.forEach(local => {
                let option = document.createElement("option");

                // console.log('Local Montagem:', local); // Log do Local Montagem
                // console.log('ID Local Montagem:', local.idmontagem); // Log do ID Local Montagem
                // console.log('Descrição Local Montagem:', local.descmontagem); // Log da descrição do Local Montagem
                // console.log('UF Local Montagem:', local.ufmontagem); // Log da UF do Local Montagem

                option.value = local.idmontagem;  // Atenção ao nome da propriedade (idMontagem)
                option.textContent = local.descmontagem; 
                option.setAttribute("data-descmontagem", local.descmontagem);
                option.setAttribute("data-ufmontagem", local.ufmontagem); 
                select.appendChild(option);

                console.log("Select atualizado:", select.innerHTML);

                locaisDeMontagem = montagem;


                

            });
            
        });
    
    })

     // Chama a função para atualizar o campo UF após carregar os locais de montagem
    .catch(error => console.error('Erro ao carregar Local Montagem:', error));
}

function configurarFormulario() {
    let form = document.querySelector("#form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let idCliente = document.getElementById("idCliente").value;
        console.log("ID Cliente:", idCliente); // Log do ID do cliente
        // let idMontagem = document.getElementById("idMontagem").value;

        let tabela = document.getElementById("tabela");
        let linhas = tabela.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        let orcamento = { idCliente, itens: [] };

        for (let linha of linhas) {
            let dados = {
                // idCargo: linha.cells[0].querySelector(".idCargo").value,
                qtdPessoas: linha.cells[1].textContent.trim(),
                qtdDias: linha.cells[2].textContent.trim(),
                valor: linha.cells[3].textContent.trim(),
                total: linha.cells[4].textContent.trim()
            };
            orcamento.itens.push(dados);
        }

        fetch('/salvar-orcamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orcamento)
        })
        .then(response => response.json())
        .then(data => {
            alert("Orçamento salvo com sucesso!");
            fecharModal();
        })
        .catch(error => console.error("Erro ao salvar:", error));
    });



    
}

function calcularTotais() {
    let tabela = document.getElementById("tabela");
    
    if (!tabela) return;

    tabela.addEventListener("input", function (event) {
        let target = event.target;

        // Verifica se o evento foi disparado em "qtdPessoas" ou "qtdDias"
        if (target.classList.contains("qtdPessoas") || target.classList.contains("qtdDias") ||
            target.classList.contains("hospedagem") || target.classList.contains("transporte")) {
            
            let linha = target.closest("tr"); // Obtém a linha atual

            let qtdPessoas = parseFloat(linha.querySelector(".qtdPessoas").value) || 0;
            let qtdDias = parseFloat(linha.querySelector(".qtdDias").value) || 0;
            let vlrCusto = parseFloat(linha.querySelector(".vlrCusto").textContent) || 0;
            let vlrVenda = parseFloat(linha.querySelector(".vlrVenda").textContent) || 0;
           
            let hospedagem = parseFloat(linha.querySelector(".hospedagem")?.value) || 0;
            let transporte = parseFloat(linha.querySelector(".transporte")?.value) || 0;
            
            // let ajdCusto = parseFloat(linha.querySelector(".ajdCusto")?.value) || 0;

            // Calcula os valores
            let totalCustoDiario = qtdPessoas * qtdDias * vlrCusto;
            let totalVendaDiario = qtdPessoas * qtdDias * vlrVenda;

            // Atualiza os campos na tabela
            linha.querySelector(".totalCustoDiario").textContent = totalCustoDiario.toFixed(2);
            linha.querySelector(".totalVendaDiario").textContent = totalVendaDiario.toFixed(2);
        }
    });
}

function adicionarLinha() {
    let tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];

    let novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td><input type="number" class="qtdPessoas" min="0" oninput="calcularTotal(this)"></td>

        <td class="cargo"></td>
        <td><input type="number" class="qtdDias" min="0" oninput="calcularTotal(this)"></td>
        <td class="vlrVenda">0</td>
        <td class="totVdaDiaria">0</td>
        <td class="vlrCusto">0</td>
        <td class="totCtoDiaria">0</td>
        <td class="ajdCusto">0</td>
        <td class="totAjdCusto">0</td>
        <td class="extraCampo" style="display: none;">
            <input type="text" class="hospedagem" min="0" step="0.01" oninput="calcularTotais()">                                
        </td>
        <td class="extraCampo" style="display: none;">
           <input type="text" class="transporte" min="0" step="0.01" oninput="calcularTotais()">
        </td>
        <td class="totGeral">0</td>
        <td><button onclick="removerLinha(this)">🗑</button></td>
    `;
}

function removerLinha(botao) {
    let linha = botao.closest("tr"); // Encontra a linha mais próxima
    linha.remove(); // Remove a linha
}

//formulario de 
function atualizarUF(selectLocalMontagem) {
     console.log("Função atualizarUF chamada");
    // console.log("Lista atual de locais antes da busca:", locaisDeMontagem);

    let selectedOption = selectLocalMontagem.options[selectLocalMontagem.selectedIndex]; // Obtém a opção selecionada
    let uf = selectedOption.getAttribute("data-ufmontagem"); // Obtém a UF
    let idLocal = selectLocalMontagem.value; 

    // console.log("UF selecionada do atualizarUF:", uf); // Verifica se o valor está correto

    const ufSelecionada = uf.trim(); // Obtém o valor da UF selecionada
    
    let inputUF = document.getElementById("ufmontagem"); 

    if (inputUF) {
        
        inputUF.value = uf;//uf; // Atualiza o campo de input
       
        
    } else {
        console.error("Campo 'ufmontagem' não encontrado!");
    }

    //verificarUF(ufSelecionada);

    const colunasExtras = document.querySelectorAll(".extraColuna"); // Colunas do cabeçalho
    const camposExtras = document.querySelectorAll(".extraCampo"); // Campos na tabela
    
    
    if (ufSelecionada !== "SP") {
        console.log("UF diferente de SP, exibindo campos extras.");
        colunasExtras.forEach(col => col.style.display = "table-cell"); // Exibe cabeçalho
        camposExtras.forEach(campo => campo.style.display = "table-cell"); // Exibe campos
    } else {
        console.log("UF é SP, ocultando campos extras.");
        colunasExtras.forEach(col => col.style.display = "none"); // Oculta cabeçalho
        camposExtras.forEach(campo => campo.style.display = "none"); // Oculta campos
    }
   
}

// function verificarUF(ufSelecionada) {
//     // const colunasExtras = document.querySelectorAll(".extraColuna"); // Colunas do cabeçalho
//     // const camposExtras = document.querySelectorAll(".extraCampo"); // Campos na tabela
    
    
//     // if (ufSelecionada !== "SP") {
//     //     console.log("UF diferente de SP, exibindo campos extras.");
//     //     colunasExtras.forEach(col => col.style.display = "table-cell"); // Exibe cabeçalho
//     //     camposExtras.forEach(campo => campo.style.display = "table-cell"); // Exibe campos
//     // } else {
//     //     console.log("UF é SP, ocultando campos extras.");
//     //     colunasExtras.forEach(col => col.style.display = "none"); // Oculta cabeçalho
//     //     camposExtras.forEach(campo => campo.style.display = "none"); // Oculta campos
//     // }
// }



// Função para configurar eventos no modal de orçamento
function configurarEventosOrcamento() {
    carregarCargos();
    carregarLocalMont();
    configurarFormulario();

    
    let selectCargo = document.querySelector(".idCargo");
    if (selectCargo) {
        selectCargo.addEventListener("change", function () {
            

            let selectedOption = selectCargo.options[selectCargo.selectedIndex]; // Pegamos a opção correta

            let cargoSelecionado = selectedOption.getAttribute("data-desccargo");
            let vlrCusto = selectedOption.getAttribute("data-cto");
            let vlrVenda = selectedOption.getAttribute("data-vda");

            let tabela = document.getElementById("tabela");
            let ultimaLinha = tabela.querySelector("tbody tr:last-child");

            if (ultimaLinha) {
                let celulaCargo = ultimaLinha.querySelector(".cargo");
                if (celulaCargo) celulaCargo.textContent = cargoSelecionado;
                let celulaVlrCusto = ultimaLinha.querySelector(".vlrCusto");
                if (celulaVlrCusto) celulaVlrCusto.textContent = vlrCusto; // Insere o ctoCargo na coluna correta
                let celulaVlrVenda = ultimaLinha.querySelector(".vlrVenda");
                if (celulaVlrVenda) celulaVlrVenda.textContent = vlrVenda; // Insere o vdaCargo na coluna correta

                console.log("Opção selecionada:", selectedOption); // Log da opção selecionada
                console.log("Valor:", selectedOption.value); // Log do valor da opção selecionada
            }

            if (tabela) {
                tabela.addEventListener("input", function (event) {
                let target = event.target;

                // Verifica se o evento foi disparado em "qtdPessoas" ou "qtdDias"
                    if (target.classList.contains("qtdPessoas") || target.classList.contains("qtdDias")) {
                        let linha = target.closest("tr"); // Obtém a linha atual

                        let qtdPessoas = parseFloat(linha.querySelector(".qtdPessoas").value) || 0;
                        let qtdDias = parseFloat(linha.querySelector(".qtdDias").value) || 0;
                        let vlrCusto = parseFloat(linha.querySelector(".vlrCusto").textContent) || 0;
                        let vlrVenda = parseFloat(linha.querySelector(".vlrVenda").textContent) || 0;

                        console.log("Quantidade de Pessoas:", qtdPessoas); // Log da quantidade de pessoas
                        console.log("Quantidade de Dias:", qtdDias); // Log da quantidade de dias
                        console.log("Valor Custo:", vlrCusto); // Log do valor custo
                        console.log("Valor Venda:", vlrVenda); // Log do valor venda

                        // Calcula os valores
                        let totalCustoDiario = qtdPessoas * qtdDias * vlrCusto;
                        let totalVendaDiario = qtdPessoas * qtdDias * vlrVenda;

                        console.log("Total Custo Diário:", totalCustoDiario); // Log do total custo diário
                        console.log("Total Venda Diário:", totalVendaDiario); // Log do total venda diário

                        // Atualiza os campos na tabela
                        linha.querySelector(".totCtoDiaria").textContent = totalCustoDiario.toFixed(2);
                        linha.querySelector(".totVdaDiaria").textContent = totalVendaDiario.toFixed(2);
                    }
                });
            }
        
        });
    }



    calcularTotais();
  

}

// Exportar as funções se necessário
window.configurarEventosOrcamento = configurarEventosOrcamento;
