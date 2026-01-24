const container = document.getElementById("lista-imobiliarias");
const modal = document.getElementById("modal");
const modalNome = document.getElementById("modal-nome");
const modalCidade = document.getElementById("modal-cidade");
const modalContatos = document.getElementById("modal-contatos");
const feedback = document.getElementById("feedback");

// RENDERIZA CARDS

let ordemAscendente = true;

function renderizarImobiliarias(lista) {
  container.innerHTML = "";

  lista.forEach(imob => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${imob.logo}">
      <h3>${imob.nome}</h3>
      <span>${imob.cidade}</span>
      <button>Ver contatos</button>
    `;

    card.querySelector("button").onclick = () => abrirModal(imob);

    container.appendChild(card);
  });
}

// render inicial (A–Z)
renderizarImobiliarias(
    IMOBILIARIAS
);

// alternar ordem
function alternarOrdem() {
  ordemAscendente = !ordemAscendente;

  const ordenado = [...IMOBILIARIAS].sort((a, b) =>
    ordemAscendente
      ? a.nome.localeCompare(b.nome, "pt-BR")
      : b.nome.localeCompare(a.nome, "pt-BR")
  );

  document.getElementById("btn-ordem").innerText =
    ordemAscendente ? "Ordenar: A–Z" : "Ordenar: Z–A";

  renderizarImobiliarias(ordenado);
}


// ABRIR MODAL
const modalLogo = document.getElementById("modal-logo");

function abrirModal(imob) {
  modalNome.innerText = imob.nome;
  modalCidade.innerText = imob.cidade;
  modalLogo.src = imob.logo;

  modalContatos.innerHTML = "";
  feedback.innerText = "";

  imob.contatos.forEach(c => {
    const div = document.createElement("div");
    div.className = "contato";

    let icone = "";
    let texto = c.valor;

    if (c.tipo.toLowerCase() === "whatsapp") {
      icone = "📱";
    }

    if (c.tipo.toLowerCase() === "telefone") {
      icone = "☎️";
    }

    if (c.tipo.toLowerCase() === "site") {
      icone = "🌐";
      texto = c.valor.replace("https://", "");
    }
    

    div.innerHTML = `
      <span>${icone} ${texto}</span>
      <button onclick="copiar('${c.valor}')">Copiar</button>
    `;

    modalContatos.appendChild(div);
  });

  modal.style.display = "flex";
}


// COPIAR
function copiar(texto) {
  navigator.clipboard.writeText(texto);
  feedback.innerText = "✔ Contato copiado.";
}

// FECHAR
function fecharModal() {
  modal.style.display = "none";
}
