function converterMoeda() {
    let valor = parseFloat(document.querySelector("#valor").value)
    console.log("Valor para ser convertido: " + `${valor}`)

    let moedaOrigem = document.querySelector("#deMoeda").value
    console.log("Moeda de origem: " + `${moedaOrigem}`)

    let moedaDestino = document.querySelector("#paraMoeda").value
    console.log("Moeda de destino: " + `${moedaDestino}`)   

    var url = `https://openexchangerates.org/api/latest.json?app_id=d10c26057e574b2ca315ffa8d6080649&symbols=${moedaOrigem},${moedaDestino}`

    fetch(url) 
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar taxas de câmbio")
        }
        return response.json()
    })
    .then(data => {
        console.log(data) 

        let valorOrigem = data.rates[moedaOrigem]
        let valorDestino = data.rates[moedaDestino]

        console.log(`O valor de ${moedaOrigem} = ${valorOrigem}`)
        console.log(`O valor de ${moedaDestino} = ${valorDestino}`)

        let valorConvertido = (valor / valorOrigem) * valorDestino
        console.log(`O valor convertido é igual a ${valorConvertido}`)
        
        if(isNaN(valor)) {
            let resultado = document.querySelector("#resultado")
            resultado.innerHTML = "Digite um valor para que seja convertido."
        } else {
            let resultado = document.querySelector("#resultado")
            resultado.innerHTML = `${valor} ${moedaOrigem} = <br> ${valorConvertido} ${moedaDestino}`
        }

    })
    .catch(error => {
        console.error("Ocorreu um erro ao solicitar as taxas de câmbio à API.")
    })

}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        document.querySelector("#botao").click();
    }
}
document.addEventListener("keypress", handleKeyPress);
