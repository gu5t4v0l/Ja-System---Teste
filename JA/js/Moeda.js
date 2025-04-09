function inicializarMoeda() {
    const inputCusto = document.getElementById('vlrCusto');
    const inputVenda = document.getElementById('vlrVenda');
    const inputBeneficios = document.getElementById('Beneficios'); // ID correto para o campo Benefícios

    let algumCampoEncontrado = false; // Flag para verificar se ao menos um campo foi encontrado

    // Verifica se os elementos foram encontrados
    if (inputCusto) {
        algumCampoEncontrado = true;
    } else {
        // console.error("Erro: input Custo não encontrado!");
    }

    if (inputVenda) {
        algumCampoEncontrado = true;
    } else {
        // console.error("Erro: input Venda não encontrado!");
    }

    if (inputBeneficios) {
        algumCampoEncontrado = true;
    } else {
        // console.error("Erro: input Beneficios não encontrado!");
    }

    // Se ao menos um campo for encontrado, inicializa os inputs
    if (algumCampoEncontrado) {
        // Função para formatar os valores em moeda
        function formatarMoeda(valor) {
            let numero = valor.replace(/\D/g, ''); // Remove tudo que não for número
            if (numero === "") numero = "0"; // Se estiver vazio, define como "0"

            // Converte para número e divide por 100 para incluir os centavos
            let valorFormatado = (parseInt(numero, 10) / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            return valorFormatado;
        }

        // Função que aplica a formatação ao digitar
        function atualizarValor(e) {
            e.target.value = formatarMoeda(e.target.value);
        }

        // Função que garante que o campo de valor tenha um valor mínimo
        function garantirValorMinimo(e) {
            if (e.target.value.trim() === "" || e.target.value === "R$ 0,00") {
                e.target.value = "R$ 0,00";
            }
        }

        // Aplica a formatação inicial para ambos os campos encontrados
        if (inputCusto) inputCusto.value = "R$ 0,00";
        if (inputVenda) inputVenda.value = "R$ 0,00";
        if (inputBeneficios) inputBeneficios.value = "R$ 0,00";

        // Atualiza a formatação enquanto digita
        if (inputCusto) inputCusto.addEventListener('input', atualizarValor);
        if (inputVenda) inputVenda.addEventListener('input', atualizarValor);
        if (inputBeneficios) inputBeneficios.addEventListener('input', atualizarValor);

        // Garante que "R$ 0,00" apareça ao perder o foco
        if (inputCusto) inputCusto.addEventListener('blur', garantirValorMinimo);
        if (inputVenda) inputVenda.addEventListener('blur', garantirValorMinimo);
        if (inputBeneficios) inputBeneficios.addEventListener('blur', garantirValorMinimo);

        console.log("Formatador de moeda inicializado.");
    } else {
        console.error("Nenhum campo encontrado para inicializar.");
    }
}

// Inicialize a função após o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', inicializarMoeda);

