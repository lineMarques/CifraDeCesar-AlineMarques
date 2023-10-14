function cifraDeCesar() {
  const btnCifrar = document.getElementById("idBtnCifrar");
  let encoding = "";
  let descoding = "";

  btnCifrar.addEventListener("click", function (event) {
    event.preventDefault();

    const TxEscolha = document.querySelector("input[name=nmTxEscolha]:checked").value;

    /* Dados Validados */
    let vl = validaDados();
    if (vl.flag == true) {
      return;
    }

    if (TxEscolha == "cifrado") {

      for (let index = 0; index < vl.texto.value.length; index++) {
        /* Trabalhando com numeros da tabela ASCII.
          codigo = (Valor da letra - valor da primeira letra do vl.alfabeto) + valor da vl.cifra
          modulo é usado para quando o valor passar de 26
          usar o resto para voltar ao inicio do vl.alfabeto
         */

        let codigo =
          (vl.texto.value[index].toLowerCase().charCodeAt(0) - vl.alfabeto[0].charCodeAt(0) + Number(vl.cifra)) % 26;
        encoding += vl.alfabeto[codigo];
      }
      vl.texto.value = encoding;
      encoding = "";

    } else {

      for (let index = 0; index < vl.texto.value.length; index++) {
        let reverteCodigo =
          (vl.texto.value[index].charCodeAt(0) - vl.alfabeto[0].charCodeAt(0) + 26 - Number(vl.cifra)) % 26;
        descoding += vl.alfabeto[reverteCodigo];
      }
      vl.texto.value = descoding;
      descoding = "";
      
    }
  });
}

function validaDados() {
  /* Entradas de dados */
  let texto = document.getElementById("idTextArea");
  let cifra = document.getElementById("idCifra").value;
  const alfabeto = "abcdefghijklmnopqrstuvxwyz";
  let flag = false;

  let output = document.getElementById("idSaida");
  output.innerText = "";

  /* Validando texto: se regex der false da msg de erro e retorna */
  for (let index = 0; index < texto.value.length; index++) {
    let regex = new RegExp("[a-zA-Z]").test(texto.value[index]);

    if (regex == false) {
      output.innerText = "O texto de entrada deve conter somente letras";
      flag = true;
    }
  }

  /*Validando vl.Cifra: laço para percorrer vl.alfabeto validando o valor digitado na variavel vl.cifra */
  for (let index = 0; index < alfabeto.length; index++) {
    /* Validando que a variavel vl.cifra está entre as letras a e i e entre os numeros 1 e 9. */
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
cifraDeCesar();
