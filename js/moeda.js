"use strict";
const valor = document.getElementById("valor");
const saida = document.getElementById("saida");
const de = document.getElementById("deMoeda");
const para = document.getElementById("ParaMoeda");
const btnConverter = document.getElementById("calculate");

function obterEntrada(){
    return de.value;
}

function obterSaida(){
    return para.value;
}

function obterValor(){
    return valor.value
}


function apresentarDados(obj){
    return (!obj.erro)? 
    ` ${Object.values(obj)[0].ask}
    ` :
    
    "Impossivel resgatar";
}


async function buscarDadosConv(){
    if (obterValor() === "") {
        saida.textContent = "Por favor, insira um valor.";
        return;
    }
    else if(obterSaida() === "" || obterEntrada === ""){
        saida.textContent = "Por favor, selecione qual moeda deseja para converter.";
        return 
    }
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(obterValor())) {
        saida.textContent = "Por favor, insira um valor válido.";
        return;
    }
    try{
        let urlAPI = `https://economia.awesomeapi.com.br/json/last/${obterEntrada()}-${obterSaida()}`;
        const trazerAPI = fetch(urlAPI);
        const resp = await trazerAPI;
        const dados = await resp.json();
        let Res = obterValor() * apresentarDados(dados);
        saida.textContent = Res.toFixed(2) + para.value;
    }
    catch(erro){
        saida.textContent = "Erro ao buscar dados.";

    }
}

btnConverter.addEventListener("click", buscarDadosConv);