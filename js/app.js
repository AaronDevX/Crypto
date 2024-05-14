const selectFiat = document.querySelector("#moneda");
const selectCrypto = document.querySelector("#criptomonedas");
const form = document.querySelector("#formulario");
const result = document.querySelector("#resultado");

document.addEventListener("DOMContentLoaded", consultarCriptomonedas);
form.addEventListener("submit", cotizar)

/* Promise */

/* const obtenerDatosCrypto = (cryptos) => {
    return new Promise(resolve => {
            resolve(cryptos)
            }
    )
}*/

const obtenerDatosCrypto = cryptos => new Promise(resolve => resolve(cryptos))

function consultarCriptomonedas(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerDatosCrypto(resultado.Data))
        .then(cryptos => crypto0ptions(cryptos))
}

function crypto0ptions(cryptos){
    cryptos.forEach(crypto => {
        const {FullName, Name} = crypto.CoinInfo;
        const option = document.createElement("OPTION");
        option.value = Name;
        option.textContent = FullName;

        selectCrypto.appendChild(option)
    })
}

function cotizar(e){
    e.preventDefault();

    if(selectFiat.value=="" || selectCrypto.value==""){
        cleanHtml(result);
        printAlert("Seleccione correctamente", "error");
        return;
    }

    consultarCotizacion()
}

function printAlert(message, type){
    const errorAlert = document.createElement("div");
    const erroAlertText = document.createElement("P");
    erroAlertText.textContent = message;
    errorAlert.classList.add(type);

    errorAlert.appendChild(erroAlertText);
    result.appendChild(errorAlert);
}

function cleanHtml(element){
    while(element.hasChildNodes()){
        element.firstChild.remove();
    }
}

function consultarCotizacion(){
    
    const url = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${selectCrypto.value}&tsym=${selectFiat.value}&e=Kraken`;

    showSpinner();

    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(resultado=>displaysResults(resultado))
}

function displaysResults(r){
    cleanHtml(result)

    const {HIGH24HOUR, LOW24HOUR, PRICE, LASTUPDATE} = r.DISPLAY

    const highDiv = document.createElement("DIV");
    const lowDiv = document.createElement("DIV");
    const priceDiv = document.createElement("DIV");
    const lastUpdateDiv = document.createElement("DIV");

    const highSpan = document.createElement("SPAN");
    const lowSpan = document.createElement("SPAN");
    const priceSpan = document.createElement("SPAN");
    const lastUpdateSpan = document.createElement("SPAN");

    const highP = document.createElement("P");
    const lowP = document.createElement("P");
    const priceP = document.createElement("P");
    const lastUpdateP = document.createElement("P");

    priceP.id = "price-now"

    highSpan.textContent= "Max Precio 24H: "
    lowSpan.textContent=   "Min Precio 24H: "
    priceSpan.textContent= "Precio Actual: "
    lastUpdateSpan.textContent= "Ultima Actualizacion: "

    highP.textContent= HIGH24HOUR;
    lowP.textContent= LOW24HOUR;
    priceP.textContent=PRICE;
    lastUpdateP.textContent= LASTUPDATE;

    highDiv.appendChild(highSpan);
    lowDiv.appendChild(lowSpan);
    priceDiv.appendChild(priceSpan);
    lastUpdateDiv.appendChild(lastUpdateSpan);

    highDiv.appendChild(highP);
    lowDiv.appendChild(lowP);
    priceDiv.appendChild(priceP);
    lastUpdateDiv.appendChild(lastUpdateP);

    result.appendChild(priceDiv);
    result.appendChild(highDiv);
    result.appendChild(lowDiv);
    result.appendChild(lastUpdateDiv);
}

function showSpinner(){
    cleanHtml(result);

    const divSpinner = document.createElement("DIV");
    divSpinner.classList.add("spinner");

    for(let i=1; i<=3; i++){
        const spinnerB = document.createElement("DIV");
        spinnerB.classList.add(`bounce${i}`);
        divSpinner.appendChild(spinnerB);
    }

    result.appendChild(divSpinner)
}