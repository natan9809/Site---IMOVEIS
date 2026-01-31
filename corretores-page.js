const container = document.getElementById("lista-corretores");
const modal = document.getElementById("modal");
const modalNome = document.getElementById("modal-nome");
const modalCidade = document.getElementById("modal-cidade");
const modalContatos = document.getElementById("modal-contatos");
const feedback = document.getElementById("feedback");
const modalFoto = document.getElementById("modal-logo"); // reaproveita classe

let ordemAscendente = true;

// RENDERIZA CARDS
function renderizarCorretores(lista) {
  container.innerHTML = "";

  lista.forEach(corretor => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${corretor.foto}">
      <h3>${corretor.nome}</h3>
      <span>${corretor.cidade}</span>
      <button>Ver contatos</button>
    `;

    card.querySelector("button").onclick = () => abrirModal(corretor);

    container.appendChild(card);
  });
}

// RENDER INICIAL (ordem natural do banco)
renderizarCorretores(CORRETORES);

// ORDENAR A–Z / Z–A
function alternarOrdem() {
  ordemAscendente = !ordemAscendente;

  const ordenado = [...CORRETORES].sort((a, b) =>
    ordemAscendente
      ? a.nome.localeCompare(b.nome, "pt-BR")
      : b.nome.localeCompare(a.nome, "pt-BR")
  );

  document.getElementById("btn-ordem").innerText =
    ordemAscendente ? "Ordenar: A–Z" : "Ordenar: Z–A";

  renderizarCorretores(ordenado);
}

// ABRIR MODAL
function abrirModal(corretor) {
  modalNome.innerText = corretor.nome;
  modalCidade.innerText = corretor.cidade;
  modalFoto.src = corretor.foto;

  modalContatos.innerHTML = "";
  feedback.innerText = "";

  corretor.contatos.forEach(c => {
    const div = document.createElement("div");
    div.className = "contato";

    let icone = "";
    let classeIcone = "";
    let texto = c.valor;

      
    if (c.tipo.toLowerCase() === "whatsapp") {
      icone = "fab fa-whatsapp";
      classeIcone = "icone-whatsapp";
    };

    if (c.tipo.toLowerCase() === "telefone") {
      icone = "fas fa-phone";
      classeIcone = "icone-telefone";
    };

    if (c.tipo.toLowerCase() === "site") {
      icone = "fas fa-globe";
      classeIcone = "icone-site";
      texto = c.valor.replace("https://", "");
    };

    if (c.tipo.toLowerCase() === "instagram") {
      icone = "fab fa-instagram";
      classeIcone = "icone-instagram";
    };

   div.innerHTML = `
  <span class="texto-contato">
    <i class="${icone} ${classeIcone}"></i>
    ${texto}
  </span>

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

// FECHAR MODAL
function fecharModal() {
  modal.style.display = "none";
}
