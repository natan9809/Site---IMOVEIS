const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const imovel = IMOVEIS.find(i => i.id === id);

let indiceImagem = 0;

// ELEMENTOS
const titulo = document.getElementById("titulo-imovel");
const img = document.getElementById("imagem-principal");
const local = document.getElementById("local");
const tamanho = document.getElementById("tamanho");
const construido = document.getElementById("construido");
const preco = document.getElementById("preco");
const descricao = document.getElementById("descricao");
const empresas = document.getElementById("lista-empresas");
const detalhes = document.getElementById("detalhes");

// PREENCHE DADOS
titulo.innerText = `${imovel.tipo.toUpperCase()} no Bairro ${imovel.bairro}`;
img.src = imovel.imagens[0];
local.innerText = `📍 ${imovel.bairro} - ${imovel.cidade}`;
tamanho.innerText = `📐 ${imovel.tamanho} m² construido`;
construido.innerText = `📐 ${imovel.construido} m² de lote`;
detalhes.innerText = `🛋️ ${imovel.sala} sala 🚿${imovel.banheiro} banheiro 🛏️${imovel.quarto} quarto`;
preco.innerText = `💰 R$ ${imovel.preco.toLocaleString("pt-BR")}`;
descricao.innerText = imovel.descricao || "";


// GALERIA
function proximaImagem() {
    indiceImagem = (indiceImagem + 1) % imovel.imagens.length;
    img.src = imovel.imagens[indiceImagem];
    atualizarMiniaturas();
}

function imagemAnterior() {
    indiceImagem =
        (indiceImagem - 1 + imovel.imagens.length) % imovel.imagens.length;
    img.src = imovel.imagens[indiceImagem];
    atualizarMiniaturas();
}

// LIMPA LISTA
empresas.innerHTML = "";

// SE EXISTIREM VÍNCULOS (imobiliária / corretor)
if (Array.isArray(imovel.empresas)) {

  imovel.empresas.forEach(ref => {
    let dados = null;

    if (ref.tipo === "imobiliarias") {
      dados = IMOBILIARIAS.find(i => i.id === ref.id);
    }

    if (ref.tipo === "corretores") {
      dados = CORRETORES.find(c => c.id === ref.id);
    }

    if (!dados) return;

    const div = document.createElement("div");
    div.className = "empresa";

    div.innerHTML = `
      <img src="${dados.logo || dados.foto}" alt="${dados.nome}">
      <p>${dados.nome}</p>
    `;

    div.onclick = () => abrirModalContatoEmpresa(dados, ref.tipo);
    empresas.appendChild(div);
  });
}

/* 🔥 SEMPRE adiciona o botão de contato direto */
const dono = document.createElement("div");
dono.className = "empresa fallback";

dono.innerHTML = `
  <p>Prefere que a gente entre em contato com você?</p>
  <button class="btn-contato-dono" onclick="abrirModalContato()">
    Quero que entrem em contato comigo
  </button>
`;

empresas.appendChild(dono);







function contatoEmpresa(emp) {
    const nome = prompt("Digite seu nome:");
    if (!nome) return;

    window.open(
        `https://wa.me/${emp.whatsapp}?text=${encodeURIComponent(
            `Olá, meu nome é ${nome}. Tenho interesse no imóvel ${imovel.id}.`
        )}`,
        "_blank"
    );
}

function contatoDireto() {
    //const nome = prompt("Digite seu nome:");
    if (!nome) return;

    window.open(
        `https://wa.me/5537998090048?text=${encodeURIComponent(
            `Olá, meu nome é ${nome}. Tenho interesse no imóvel ${imovel.id}.`
        )}`,
        "_blank"
    );
}

function voltar() {
    localStorage.setItem("voltarSemModal", "true");
    window.history.back();
}


function gerarMeuFiltro(imovelAtual) {
  const estadoSalvo = JSON.parse(localStorage.getItem("estadoFiltro")) || {};

  const tipoFiltro = estadoSalvo.tipoSelecionado || imovelAtual.tipo;
  const bairroFiltro = estadoSalvo.filtrosAtivos?.bairro || null;

  let resultado = IMOVEIS.filter(imovel => {
    if (imovel.id === imovelAtual.id) return false;
    if (tipoFiltro && imovel.tipo !== tipoFiltro) return false;
    if (bairroFiltro && imovel.bairro !== bairroFiltro) return false;
    return true;
  });

  // 🔁 FALLBACK 1 — mesmo tipo
  if (resultado.length === 0) {
    resultado = IMOVEIS.filter(imovel =>
      imovel.id !== imovelAtual.id &&
      imovel.tipo === imovelAtual.tipo
    );
  }

  // 🔁 FALLBACK 2 — qualquer outro
  if (resultado.length === 0) {
    resultado = IMOVEIS.filter(imovel =>
      imovel.id !== imovelAtual.id
    );
  }

  atualizarTituloMeuFiltro(bairroFiltro);

  return resultado.slice(0, 8); // limite visual
}

function abrirImovel(id) {
  window.location.href = `imovel.html?id=${id}`;
}


function renderizarMeuFiltro(lista) {
  const container = document.getElementById("carrossel-filtro");
  const prev = document.getElementById("prevFiltro");
  const next = document.getElementById("nextFiltro");

  container.innerHTML = "";

  lista.forEach(imovel => {
    container.innerHTML += `
      <div class="card-filtro" onclick="abrirImovel(${imovel.id})">
        <img src="${imovel.imagens[0]}">
        <div class="info">
          <h4>${imovel.tipo.toUpperCase()} no Bairro ${imovel.bairro}</h4>
          <span>R$ ${imovel.preco.toLocaleString("pt-BR")}</span>
        </div>
      </div>
    `;
  });



  // 👉 Mostra ou esconde setas
  if (lista.length <= 1) {
    prev.style.display = "none";
    next.style.display = "none";
  } else {
    prev.style.display = "block";
    next.style.display = "block";
  }

  prev.onclick = () => {
    container.scrollLeft -= 260;
  };

  next.onclick = () => {
    container.scrollLeft += 260;
  };
}


function atualizarTituloMeuFiltro(bairroFiltro) {
  const titulo = document.getElementById("titulo-meu-filtro");

  if (bairroFiltro) {
    titulo.innerText =
      "MEU FILTRO — outros imóveis que combinam com você";
  } else {
    titulo.innerText =
      "Sugestões — outros imóveis disponíveis";
  }
}

const meuFiltro = gerarMeuFiltro(imovel)
renderizarMeuFiltro(meuFiltro);

function abrirModalContato() {
  document.getElementById("modal-contato").classList.remove("hidden");
}

function fecharModalContato() {
  document.getElementById("modal-contato").classList.add("hidden");
}

document.getElementById("form-contato").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("contato-nome").value.trim();
  const telefone = document.getElementById("contato-telefone").value.trim();
  const email = document.getElementById("contato-email").value.trim();

  if (!nome || !telefone || !email) {
    alert("Preencha todos os campos.");
    return;
  }

  const FORM_URL =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfnVOzvOSy7ago0Cb3p-Qxd3k_TqEMEZHs7qqoukjlqWG8KyQ/formResponse";

  const data = new FormData();
  data.append("entry.2128309476", nome);
  data.append("entry.145003274", telefone);
  data.append("entry.1780892043", email);
  data.append(
    "entry.1488528612",
    `${imovel.tipo.toUpperCase()} - ${imovel.bairro} (ID ${imovel.id})`
  );

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: data
  });

  alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");

  fecharModalContato();
});




const miniaturas = document.getElementById("miniaturas");

// gera miniaturas
function renderizarMiniaturas() {
  miniaturas.innerHTML = "";

  imovel.imagens.forEach((src, index) => {
    const imgMini = document.createElement("img");
    imgMini.src = src;

    if (index === indiceImagem) {
      imgMini.classList.add("ativa");
    }

    imgMini.onclick = () => {
      indiceImagem = index;
      img.src = imovel.imagens[indiceImagem];
      atualizarMiniaturas();
    };

    miniaturas.appendChild(imgMini);
  });
}

function atualizarMiniaturas() {
  document.querySelectorAll(".miniaturas img").forEach((img, i) => {
    img.classList.toggle("ativa", i === indiceImagem);
  });
}


///==========MODO SWIPE===============================
let touchStartX = 0;
let touchEndX = 0;

const galeria = document.querySelector(".galeria");

// quando toca
galeria.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

// quando solta
galeria.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  detectarSwipe();
});

function detectarSwipe() {
  const distancia = touchEndX - touchStartX;

  // sensibilidade do swipe (quanto maior, mais difícil)
  const limite = 50;

  if (distancia > limite) {
    imagemAnterior(); // swipe para direita
  }

  if (distancia < -limite) {
    proximaImagem(); // swipe para esquerda
  }
}

function abrirMenu() {
  document.body.style.overflow = "hidden";
  document.getElementById("drawer").classList.add("aberto");
  document.getElementById("overlay").classList.add("ativo");
}

function fecharMenu() {
  document.body.style.overflow = "";
  document.getElementById("drawer").classList.remove("aberto");
  document.getElementById("overlay").classList.remove("ativo");
}



renderizarMiniaturas();
