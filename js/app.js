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
    cleanHtml(result);

    if(selectFiat.value=="" || selectCrypto.value==""){
        printAlert("Seleccione correctamente", "error-alert");
        return;
    }

    consultarCotizacion()
}

