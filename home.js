const containerImobiliarias = document.getElementById("carrossel-imobiliarias");

IMOBILIARIAS.forEach(imob => {
  const card = document.createElement("div");
  card.className = "card-imobiliaria";

  card.innerHTML = `
    <img src="${imob.logo}" alt="${imob.nome}">
    <h3>${imob.nome}</h3>
    <span>${imob.cidade}</span>
  `;

  // 🔥 CLIQUE NO CARD
  card.addEventListener("click", () => {
    abrirModalImobiliaria(imob);
  });

  containerImobiliarias.appendChild(card);
});

function abrirModalImobiliaria(imob) {
  document.getElementById("modal-logo").src = imob.logo;
  document.getElementById("modal-nome").innerText = imob.nome;
  document.getElementById("modal-cidade").innerText = imob.cidade;

  const contatos = document.getElementById("modal-contatos");
  contatos.innerHTML = "";

  imob.contatos.forEach(c => {
    if (c.tipo === "whatsapp") {
  contatos.innerHTML += `
    <div class="contato-item">
      📱 ${c.valor}
    </div>
  `;
}

if (c.tipo === "telefone") {
  contatos.innerHTML += `
        <div class="contato-item">
        ☎️ ${c.valor}
        </div>
    `;
    }

    contatos.innerHTML += `
        <a class="contato-link" href="${c.site}">
        🌐
        </a>
    `;
    
  });

  document.getElementById("modal-imobiliaria").style.display = "flex";
}

function fecharModalImobiliaria() {
  document.getElementById("modal-imobiliaria").style.display = "none";
}


const containerCorretores = document.getElementById("carrossel-corretores");

CORRETORES.forEach(corretor => {
  const card = document.createElement("div");
  card.className = "card-corretor";

  card.innerHTML = `
    <img src="${corretor.foto}">
    <h4>${corretor.nome}</h4>
    <span>${corretor.cidade}</span>
  `;

  card.onclick = () => abrirModalCorretor(corretor);

  containerCorretores.appendChild(card);
});

function abrirModalCorretor(corretor) {
  document.getElementById("modal-corretor-foto").src = corretor.foto;
  document.getElementById("modal-corretor-nome").innerText = corretor.nome;
  document.getElementById("modal-corretor-cidade").innerText = corretor.cidade;

  const contatos = document.getElementById("modal-corretor-contatos");
  contatos.innerHTML = "";

  corretor.contatos.forEach(c => {
    if (c.tipo === "whatsapp") {
      contatos.innerHTML += `
        <div class="contato-item">
          📱 ${c.valor}
        </div>
      `;
    }

    if (c.tipo === "telefone") {
      contatos.innerHTML += `
        <div class="contato-item">
          ☎️ ${c.valor}
        </div>
      `;
    }

    if (c.tipo === "site") {
      contatos.innerHTML += `
        <a class="contato-link" href="${c.valor}" target="_blank">
          🌐 Visitar site
        </a>
      `;
    }
  });

  document.getElementById("modal-corretor").style.display = "flex";
}




function fecharModalCorretor() {
  document.getElementById("modal-corretor").style.display = "none";
}

function scrollCorretores(dir) {
  containerCorretores.scrollBy({
    left: dir * 260,
    behavior: "smooth"
  });
}
function scrollCorretores(dir) {
  containerCorretores.scrollBy({
    left: dir * 260,
    behavior: "smooth"
  });
}
