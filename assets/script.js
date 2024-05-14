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
        console.log(valorConvertido)
    })
    .catch(error => {
        console.error("Ocorreu um erro ao solicitar as taxas de câmbio à API.")
    })

}

