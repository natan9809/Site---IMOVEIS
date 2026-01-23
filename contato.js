function enviarContato() {
  const nome = document.getElementById("contato-nome").value.trim();
  const email = document.getElementById("contato-email").value.trim();
  const telefone = document.getElementById("contato-telefone").value.trim();
  const tipo = document.getElementById("contato-tipo").value;
  const mensagem = document.getElementById("contato-mensagem").value.trim();
  const msg = document.getElementById("msg-contato");

  // Regex de validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefoneRegex = /^[0-9()\s-]{8,}$/;

  // Validações
  if (!nome || !email || !tipo || !mensagem) {
    msg.style.color = "red";
    msg.innerText = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (!emailRegex.test(email)) {
    msg.style.color = "red";
    msg.innerText = "Informe um e-mail válido.";
    return;
  }

  if (telefone && !telefoneRegex.test(telefone)) {
    msg.style.color = "red";
    msg.innerText = "Informe um telefone válido ou deixe em branco.";
    return;
  }

  // URL do Google Form (formResponse)
  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSc3tvmxMHJd5zNdCOXcMDWGFiRIl82d8-QhlcCP2-9mrFhv3w/formResponse";

  const data = new FormData();
  data.append("entry.266752798", nome);          // Nome
  data.append("entry.1912516212", email);        // Email
  data.append("entry.1294339924", telefone);     // Telefone (opcional)
  data.append("entry.1634284864", tipo);         // Tipo
  data.append("entry.411129961", mensagem);      // Mensagem

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: data
  });

  msg.style.color = "green";
  msg.innerText =
    "Mensagem enviada. Entraremos em contato o mais breve possível.";

  // Limpa campos
  document.getElementById("contato-nome").value = "";
  document.getElementById("contato-email").value = "";
  document.getElementById("contato-telefone").value = "";
  document.getElementById("contato-tipo").value = "";
  document.getElementById("contato-mensagem").value = "";
}
