function inicializarPorcentagem() {
setTimeout(() => {
    const inputDescontosPC = document.getElementById('perCent');

    if (!inputDescontosPC) {
        console.error("Erro: Um ou mais inputs não encontrados!");
        return;
    }

    // Função para formatar os valores em moeda
    function formatarMoeda(valor) {
        let numero = valor.replace(/\D/g, ''); // Remove tudo que não for número
        if (numero === "") numero = "0%"; // Se estiver vazio, define como "0"
        return valorFormatado;
    }

    // Função que aplica a formatação ao digitar
    function atualizarValor(e) {
        e.target.value = formatarMoeda(e.target.value);
    }

    // Função que garante que o campo de valor tenha um valor mínimo
    function garantirValorMinimo(e) {
        if (e.target.value.trim() === "" || e.target.value === "0%") {
            e.target.value = "0%";
        }
    }

    // Aplica a formatação inicial para ambos os campos
    inputDescontosPC.value = "0%";

    // Atualiza a formatação enquanto digita
    inputDescontosPC.addEventListener('input', atualizarValor);

    // Garante que "R$ 0,00" apareça ao perder o foco
    inputDescontosPC.addEventListener('blur', garantirValorMinimo);

    console.log("Formatador de Porcentagem inicializado.");
}, 200); // Pequeno atraso para garantir que o modal foi carregado
}

// Inicialize a função ao carregar a página ou ao abrir o modal
document.addEventListener('DOMContentLoaded', inicializarPorcentagem);