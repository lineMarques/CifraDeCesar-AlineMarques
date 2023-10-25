function cifraDeCesar() {
  const btnCifrar = document.getElementById("idBtnCifrar");
  let encoding = "";
  let descoding = "";

  btnCifrar.addEventListener("click", function (event) {
    event.preventDefault();

    const TxEscolha = document.querySelector("input[name=nmTxEscolha]:checked").value;

    /* validados são os dados validados */
    let validados = validaDados();
    if (validados.flag == true) {
      return;
    }

    if (TxEscolha == "cifrado") {
      for (let index = 0; index < validados.texto.value.length; index++) {
        /* Trabalhando com numeros da tabela ASCII.
          codigo = (Valor da letra - valor da primeira letra do validados.alfabeto) + valor da validados.cifra
          modulo é usado para quando o valor passar de 26
          usar o resto para voltar ao inicio do validados.alfabeto
         */

        let codigo =
          (validados.texto.value[index].toLowerCase().charCodeAt(0) - validados.alfabeto[0].charCodeAt(0) + Number(validados.cifra)) %26;

        encoding += validados.alfabeto[codigo];
      }

      validados.texto.value = encoding;
      encoding = "";
    } else {
      for (let index = 0; index < validados.texto.value.length; index++) {
        
        let reverteCodigo = 
        (validados.texto.value[index].charCodeAt(0) -  validados.alfabeto[0].charCodeAt(0) + 26 - Number(validados.cifra)) %26;

        descoding += validados.alfabeto[reverteCodigo];
      }
      validados.texto.value = descoding;
      descoding = "";
    }
  });
}cifraDeCesar();

function validaDados() {
  /* Entradas de dados */
  let texto = document.getElementById("idTextArea");
  let cifra = document.getElementById("idCifra").value;
  const alfabeto = "abcdefghijklmnopqrstuvxwyz";
  let flag = false;

  let output = document.getElementById("idSaida");
  output.innerText = "";

  /* Validando texto: se regex der false aparece msg de erro e retorna */
  for (let index = 0; index < texto.value.length; index++) {
    let regex = new RegExp("[a-zA-Z]").test(texto.value[index]);

    if (regex == false) {
      output.innerText = "O texto de entrada deve conter somente letras";
      flag = true;
    }
  }

  /*Validando validados.Cifra: laço para percorrer validados.alfabeto validando o valor digitado na variavel validados.cifra */
  for (let index = 0; index < alfabeto.length; index++) {
    /* Validando que a variavel validados.cifra está entre as letras a e i e entre os numeros 1 e 9. */
    if (cifra === alfabeto.slice(9)[index] || cifra < 1 || cifra > 9) {
      output.innerText = "Valor fora do Range";
      flag = true;
    } else {
      /* Mudando letras para numeros */
      if (cifra == alfabeto.slice(0, 9)[index]) {
        cifra = index + 1;
      }
    }
  }

  return { texto, cifra, alfabeto, flag };
}

function refreshPagina(){
  const btnRefresh = document.getElementById('idBtnRfresh')
  btnRefresh.addEventListener('click', function(){
    location.reload();
  });
} refreshPagina()

