// Objeto que contém os nomes completos das moedas, usando suas siglas como chave
const nomesMoedas = {
    "AED": "Dirham dos Emirados Árabes Unidos",
    "ARS": "Peso Argentino",
    "AUD": "Dólar Australiano",
    "BGN": "Lev Búlgaro",
    "BRL": "Real Brasileiro",
    "CAD": "Dólar Canadense",
    "CHF": "Franco Suíço",
    "CLP": "Peso Chileno",
    "CNY": "Yuan Chinês",
    "COP": "Peso Colombiano",
    "CZK": "Coroa Tcheca",
    "DKK": "Coroa Dinamarquesa",
    "EGP": "Libra Egípcia",
    "EUR": "Euro",
    "GBP": "Libra Esterlina",
    "GHS": "Cedi Ganês",
    "HKD": "Dólar de Hong Kong",
    "HUF": "Forint Húngaro",
    "IDR": "Rupia Indonésia",
    "ILS": "Novo Shekel Israelense",
    "INR": "Rúpia Indiana",
    "JPY": "Iene Japonês",
    "KES": "Xelim Queniano",
    "KRW": "Won Sul-coreano",
    "MXN": "Peso Mexicano",
    "MYR": "Ringgit Malaio",
    "NGN": "Naira Nigeriano",
    "NOK": "Coroa Norueguesa",
    "NZD": "Dólar Neozelandês",
    "PHP": "Peso Filipino",
    "PLN": "Złoty Polonês",
    "RON": "Leu Romeno",
    "RUB": "Rublo Russo",
    "SAR": "Rial Saudita",
    "SEK": "Coroa Sueca",
    "SGD": "Dólar de Singapura",
    "THB": "Baht Tailandês",
    "TRY": "Lira Turca",
    "UAH": "Hryvnia Ucraniano",
    "USD": "Dólar dos Estados Unidos",
    "VND": "Dong Vietnamita",
    "XAF": "Franco CFA da África Central",
    "XOF": "Franco CFA da África Ocidental",
    "ZAR": "Rand Sul-africano"
};

// Função que realiza a conversão de moedas
function converterMoeda() {
    // Obtém o valor a ser convertido do input e o converte para número
    let valor = parseFloat(document.querySelector("#valor").value);
    console.log("Valor para ser convertido: " + valor);

    // Obtém as siglas das moedas de origem e destino selecionadas
    let moedaOrigem = document.querySelector("#deMoeda").value;
    console.log("Moeda de origem: " + moedaOrigem);

    let moedaDestino = document.querySelector("#paraMoeda").value;
    console.log("Moeda de destino: " + moedaDestino);

    // Monta a URL para a API de taxas de câmbio, incluindo as moedas selecionadas
    var url = `https://openexchangerates.org/api/latest.json?app_id=d10c26057e574b2ca315ffa8d6080649&symbols=${moedaOrigem},${moedaDestino}`;

    // Faz uma solicitação para a API de taxas de câmbio
    fetch(url)
    .then(response => {
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error("Erro ao buscar taxas de câmbio");
        }
        // Converte a resposta para JSON
        return response.json();
    })
    .then(data => {
        console.log(data); // Exibe os dados da API no console

        // Obtém as taxas de câmbio das moedas de origem e destino
        let valorOrigem = data.rates[moedaOrigem];
        let valorDestino = data.rates[moedaDestino];

        console.log(`O valor de ${moedaOrigem} = ${valorOrigem}`);
        console.log(`O valor de ${moedaDestino} = ${valorDestino}`);

        // Calcula o valor convertido
        let valorConvertido = (valor / valorOrigem) * valorDestino;
        console.log(`O valor convertido é igual a ${valorConvertido}`);
        
        // Seleciona o elemento onde o resultado será exibido
        let resultado = document.querySelector("#resultado");

        // Verifica se o valor é um número válido
        if (isNaN(valor)) {
            resultado.innerHTML = "Digite um valor para que seja convertido.";
        } else {
            // Exibe o resultado da conversão com os nomes completos das moedas
            resultado.innerHTML = `<span style="font-size: 1rem; color: black;">${valor} ${nomesMoedas[moedaOrigem]} =</span> <br> ${valorConvertido} ${nomesMoedas[moedaDestino]}`;
        }
    })
    .catch(error => {
        // Exibe uma mensagem de erro no console se a solicitação falhar
        console.error("Ocorreu um erro ao solicitar as taxas de câmbio à API.");
    });
}

// Função que lida com a tecla pressionada
function handleKeyPress(event) {
    // Verifica se a tecla pressionada é Enter (código 13)
    if (event.keyCode === 13) {
        // Simula um clique no botão de conversão
        document.querySelector("#botao").click();
    }
}

// Adiciona um ouvinte de evento para detectar quando uma tecla é pressionada
document.addEventListener("keypress", handleKeyPress);
