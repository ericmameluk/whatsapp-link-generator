const state = {
  numberField: document.getElementById("gNumber"),
  messageField: document.getElementById("gMessage"),
  resultText: document.getElementById("result-text"),
  resultContainer: document.getElementById("result-container"),
  resultArea: document.querySelector(".result-area"),
  copyBtn: document.querySelector(".copy-btn"),
  copyIcon: document.querySelector(".copy-icon"),
  copiedIcon: document.querySelector(".copied-icon"),
};

function formValidation() {
  let inputNumber = state.numberField.value;
  const numberRegex = /\((\d{2})\) (\d{5})-(\d{4})/;
  const feedbackText = document.getElementById("feedbackMessage");
  const feedbackInput = document.getElementById("gNumber");
  if (inputNumber.match(numberRegex)) {
    var baseLink = generateLink();
    state.resultText.innerHTML = baseLink;
    state.resultContainer.style.display = "block";
    feedbackText.innerHTML = "";
    feedbackText.classList.remove("erro-input");
    feedbackInput.classList.remove("erro-input");
  } else {
    feedbackText.classList.add("erro-input");
    feedbackText.innerHTML = "Insira um número válido";
    feedbackInput.classList.add("erro-input");
  }
}

function generateLink() {
  if (state.numberField.value && state.messageField.value) {
    baseLink =
      `api.whatsapp.com/send?phone=55${state.numberField.value.match(/\d+/g).join("")}` +
      `&text=${state.messageField.value}`;
    return baseLink;
  } else {
    baseLink = `api.whatsapp.com/send?phone=55${state.numberField.value.match(/\d+/g).join("")}`;
    console.log(baseLink);
    return baseLink;
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(state.resultText.innerText);
    copyProcess();
  } catch (err) {
    alert("Erro ao copiar: ", err);
    state.copyBtn.style.backgroundColor = "#ff0000";
  }
};

function copyProcess() {
  state.copyIcon.style.display = "none";
  state.copiedIcon.style.display = "block";
  state.copyBtn.style.backgroundColor = "#9e9e9e";

  setTimeout(() => {
    state.copyBtn.style.backgroundColor = "#03c04a";
    state.copyIcon.style.display = "block";
    state.copiedIcon.style.display = "none";
  }, 1500);
}

function mascara(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("execmascara()", 1);
}

function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}

function telefone(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d\d)(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  return v;
}
