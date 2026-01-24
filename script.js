const containerImobiliarias = document.getElementById("carrossel-imobiliarias");
console.log("home.js iniciou");

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
      <a class="contato-btn">
        📱 ${c.valor}
      </a>
    `;
  }

  if (c.tipo === "telefone") {
    contatos.innerHTML += `
      <a class="contato-btn">
        ☎️ ${c.valor}
      </a>
    `;
  }

  if (c.tipo === "site") {
    contatos.innerHTML += `
      <a class="contato-btn"
         href="${c.valor.startsWith('http') ? c.valor : 'https://' + c.valor}"
         target="_blank"
         rel="noopener noreferrer">
        🌐 Site
      </a>
    `;
  }
  

});


  document.getElementById("modal-imobiliaria").style.display = "flex";
}

function fecharModalImobiliaria() {
  document.getElementById("modal-imobiliaria").style.display = "none";
}


console.log("MODAL");
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

  if (c.tipo === "telefone") {
    contatos.innerHTML += `
      <a class="contato-btn">
        ☎️ ${c.valor}
      </a>
    `;
  }
  

  if (c.tipo === "whatsapp") {
    contatos.innerHTML += `
      <a class="contato-btn">
        📱 ${c.valor}
      </a>
    `;
  }

  if (c.tipo === "site") {
    contatos.innerHTML += `
      <a class="contato-btn"
         href="${c.valor.startsWith('http') ? c.valor : 'https://' + c.valor}"
         target="_blank"
         rel="noopener noreferrer">
        🌐 Site
      </a>
    `;
  }

});


  document.getElementById("modal-corretor").style.display = "flex";
}


console.log("CORRETORES");


function fecharModalCorretor() {
  document.getElementById("modal-corretor").style.display = "none";
}

console.log("SCROLL");

function scrollCorretores(dir) {
  containerCorretores.scrollBy({
    left: dir * 260,
    behavior: "smooth"
  });
}
console.log("scrolcorretores")
function scrollImobiliarias(dir) {
  containerImobiliarias.scrollBy({
    left: dir * 260,
    behavior: "smooth"
  });
}
console.log("scrrolimobiliaria")
const containerDestaque = document.getElementById("carrossel-destaque");

console.log("ANTES DE FILTRAR");
// filtra apenas imóveis em destaque
const imoveisDestaque = IMOVEIS.filter(im => im.destaque === true);
console.log("filtra imoveis");

// fallback: se não tiver destaque, pega os últimos
const listaFinal = imoveisDestaque.length > 0
  ? imoveisDestaque
  : IMOVEIS.slice(-6);
console.log("pegar os ultimos");

if (containerDestaque) {
  listaFinal.forEach(imovel => {
    const card = document.createElement("div");
    card.className = "card-imovel";

    card.innerHTML = `
      <img src="${imovel.imagem}">
      <h3>${imovel.tipo.toUpperCase()} – ${imovel.bairro}</h3>
      <span>R$ ${imovel.preco.toLocaleString("pt-BR")}</span>
    `;

    card.onclick = () => {
      window.location.href = `imovel.html?id=${imovel.id}`;
    };

    containerDestaque.appendChild(card);
  });
}



console.log("FILTRAR");
function scrollImoveis(direcao) {
  const carrossel = document.getElementById("carrossel-destaque");

  carrossel.scrollBy({
    left: direcao * 280,
    behavior: "smooth"
  });
}

function abrirImovel(id) {
  window.location.href = `imovel.html?id=${id}`;
}

const inputBairro = document.getElementById("input-bairro");
const listaBairros = document.getElementById("lista-bairros");

inputBairro.addEventListener("input", () => {
  const texto = inputBairro.value.toLowerCase().trim();
  listaBairros.innerHTML = "";

  if (texto === "") {
    listaBairros.style.display = "none";
    return;
  }

  const resultados = BAIRROS.filter(bairro =>
    bairro.toLowerCase().includes(texto)
  );

  if (resultados.length === 0) {
    listaBairros.style.display = "none";
    return;
  }

  resultados.forEach(bairro => {
    const li = document.createElement("li");
    li.textContent = bairro;

    li.onclick = () => {
      inputBairro.value = bairro;
      listaBairros.style.display = "none";
    };

    listaBairros.appendChild(li);
  });

  listaBairros.style.display = "block";
});

// Fecha a lista ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest(".campo-autocomplete")) {
    document.querySelectorAll(".lista-autocomplete")
      .forEach(lista => lista.style.display = "none");
  }
});

const inputTipo = document.getElementById("input-tipo");
const listaTipos = document.getElementById("lista-tipos");

// MOSTRA TODAS AO CLICAR
if (inputTipo && listaTipos) {

  inputTipo.addEventListener("focus", () => {
    mostrarTipos("");
  });

// FILTRA AO DIGITAR

  inputTipo.addEventListener("input", () => {
    mostrarTipos(inputTipo.value);
  });

}

function mostrarTipos(filtro) {
  listaTipos.innerHTML = "";

  const texto = filtro.toLowerCase().trim();

  const resultados = TIPOS.filter(tipo =>
    tipo.toLowerCase().includes(texto)
  );

  resultados.forEach(tipo => {
    const li = document.createElement("li");
    li.textContent = tipo;

    li.onclick = () => {
      inputTipo.value = tipo;
      listaTipos.style.display = "none";
    };

    listaTipos.appendChild(li);
  });

  listaTipos.style.display = resultados.length ? "block" : "none";
}


// ================= COMENTÁRIOS (FINAL DO HOME.JS) =================
window.addEventListener("load", () => {
  const lista = document.getElementById("lista-comentarios");
  if (!lista) return;

  fetch("https://script.google.com/macros/s/AKfycbzvM2rgpERf4EIsX6KRy4q55Ss127ltRheMoa0zI4NpvTpIwFbjJKQoFwMsiQW-woieUQ/exec")
    .then(res => res.json())
    .then(comentarios => {
      comentarios.forEach(c => {
        const div = document.createElement("div");
        div.className = "comentario-item";
        div.innerHTML = `
          <strong>${c.nome}</strong>
          <p>${c.texto}</p>
        `;
        lista.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar comentários", err);
    });
});


// ENVIO DO COMENTÁRIO
function enviarComentario() {
  const nomeInput = document.getElementById("comentario-nome");
  const textoInput = document.getElementById("comentario-texto");
  const msg = document.getElementById("msg-envio");

  if (!nomeInput || !textoInput || !msg) return;

  const nome = nomeInput.value.trim();
  const texto = textoInput.value.trim();

  if (!nome || !texto) {
    msg.style.color = "red";
    msg.innerText = "Preencha nome e comentário.";
    return;
  }

  // 🔗 URL do Google Form (ACTION)
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfLjsNvU-_wPDDlG1NYIFW15hFk-iMsmZ0ZKE2C2aZ4u2roug/formResponse?usp=header";

  const data = new FormData();
  data.append("entry.682521495", nome);      // ID do campo Nome
  data.append("entry.992915316", texto);     // ID do campo Comentário

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: data
  });

  msg.style.color = "green";
  msg.innerText = "Comentário enviado. Obrigado!";

  nomeInput.value = "";
  textoInput.value = "";
}




