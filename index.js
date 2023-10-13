function getTexto() {
  const btnCifrar = document.getElementById("idBtnCifrar");
  let encoding = "";
  let descoding = "";

  btnCifrar.addEventListener("click", function (event) {
    event.preventDefault();

    /* Entradas de dados */
    let texto = document.getElementById("idTextArea");
    const TxEscolha = document.querySelector(
      "input[name=nmTxEscolha]:checked"
    ).value;
    let cifra = document.getElementById("idCifra").value;
    let output = document.getElementById("idSaida");
    const alfabeto = "abcdefghijklmnopqrstuvxwyz";

    /* laço para percorrer alfabeto validando o valor digitado na variavel cifra */
    for (let index = 0; index < alfabeto.length; index++) {
      /* Validando que a variavel cifra está entre as letras a e i e entre os numeros 1 e 9. */
      if (cifra === alfabeto.slice(9)[index] && (cifra < 1 || cifra > 9)) {
        output.innerText = "Valor fora do Range";
      } else {
        /* Mudando letras para numeros */
        if (cifra == alfabeto.slice(0, 9)[index]) {
          cifra = index + 1;
        }
      }
    }

    if (TxEscolha == "cifrado") {

      for (let index = 0; index < texto.value.length; index++) {
        /* Trabalhando com numeros da tabela ASCII.
          codigo = (Valor da letra - valor da primeira letra do alfabeto) + valor da cifra
          modulo é usado para quando o valor passar de 26
          usar o resto para voltar ao inicio do alfabeto
         */

        let codigo = ( (texto.value[index].toLowerCase().charCodeAt(0) - alfabeto[0].charCodeAt(0) ) + Number(cifra)) %26;
        encoding += alfabeto[codigo];
      
      }
      texto.value = encoding;
      encoding = "";

    } else {
     
      for (let index = 0; index < texto.value.length; index++) {
        let reverteCodigo = ( (texto.value[index].charCodeAt(0) - alfabeto[0].charCodeAt(0) ) + 26 - Number(cifra)) % 26;
        descoding += alfabeto[reverteCodigo];
      }
      texto.value = descoding;
      descoding = "";

    }
    
    
  });
}
getTexto();
