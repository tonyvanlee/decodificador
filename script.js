// Função para criar um número aleatório de 0 a 255
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 256);
}

// Função para gerar uma chave aleatória
function gerarChaveAleatoria() {
    let key = '';
    for (let i = 0; i < 10; i++) {
        key += String.fromCharCode(gerarNumeroAleatorio());
    }
    return key;
}

// Função para limpar o campo de entrada
function limparCampoEntrada() {
    document.querySelector('.container__criptografar textarea').value = '';
}

// Função para exibir a chave de criptografia gerada
function exibirChaveCriptografia(key) {
    const chaveElement = document.querySelector('.chave-criptografia');
    chaveElement.innerText = key;
}

// Função para exibir o texto criptografado
function exibirTextoCriptografado(texto) {
    const outputTextArea = document.querySelector('.container__output-text');
    outputTextArea.value = texto;
}

// Função para exibir o texto descriptografado
function exibirTextoDescriptografado(texto) {
    const outputTextArea = document.querySelector('.container__output-text');
    outputTextArea.value = texto;
}

// Função para copiar texto para a área de transferência
function copiarTexto() {
    const outputText = document.querySelector('.container__output-text').value;
    copyToClipboard(outputText);
}

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Texto copiado para a área de transferência!");
}

// Função para criptografar o texto inserido no campo de entrada e exibir no campo de saída
function criptografarTexto() {
    const inputText = document.querySelector('.container__criptografar textarea').value;
    const key = gerarChaveAleatoria(); // Gerar chave aleatória
    const textoCriptografado = encryptText(inputText, key);
    exibirTextoCriptografado(textoCriptografado);
    limparCampoEntrada();
    exibirChaveCriptografia(key); // Exibir chave gerada
}

// Função para descriptografar o texto inserido no campo de entrada e exibir no campo de saída
function descriptografarTexto() {
    const inputText = document.querySelector('.container__descriptografar textarea').value;
    const key = document.querySelector('.chave-criptografia').innerText; // Obter a chave inserida
    const textoDescriptografado = decryptText(inputText, key);
    exibirTextoDescriptografado(textoDescriptografado);
}

// Função para adicionar event listeners aos botões
function inicializar() {
    const criptografarBtn = document.querySelector(".container__criptografar .container__botao");
    const descriptografarBtn = document.querySelector(".container__descriptografar .container__botao");
    const copiarBtn = document.querySelector(".container__output .container__botao");

    criptografarBtn.addEventListener("click", criptografarTexto);
    descriptografarBtn.addEventListener("click", descriptografarTexto);
    copiarBtn.addEventListener("click", copiarTexto);
}

// Chamar a função inicializar ao carregar a página
window.addEventListener("DOMContentLoaded", inicializar);

// Função para criptografar o texto usando a chave fornecida
function encryptText(text, key) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        encryptedText += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedText;
}

// Função para descriptografar o texto usando a chave fornecida
function decryptText(text, key) {
    let decryptedText = '';
    for (let i = 0; i < text.length; i++) {
        decryptedText += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decryptedText;
}
