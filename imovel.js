const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const imovel = IMOVEIS.find(i => i.id === id);

let indiceImagem = 0;

// ELEMENTOS
const titulo = document.getElementById("titulo-imovel");
const img = document.getElementById("imagem-principal");
const local = document.getElementById("local");
const tamanho = document.getElementById("tamanho");
const preco = document.getElementById("preco");
const descricao = document.getElementById("descricao");
const empresas = document.getElementById("lista-empresas");

// PREENCHE DADOS
titulo.innerText = `${imovel.tipo.toUpperCase()} – ${imovel.bairro}`;
img.src = imovel.imagens[0];
local.innerText = `📍 ${imovel.bairro} - ${imovel.cidade}`;
tamanho.innerText = `📐 ${imovel.tamanho} m²`;
preco.innerText = `💰 R$ ${imovel.preco.toLocaleString("pt-BR")}`;
descricao.innerText = imovel.descricao || "";

// GALERIA
function proximaImagem() {
    indiceImagem = (indiceImagem + 1) % imovel.imagens.length;
    img.src = imovel.imagens[indiceImagem];
}

function imagemAnterior() {
    indiceImagem =
        (indiceImagem - 1 + imovel.imagens.length) % imovel.imagens.length;
    img.src = imovel.imagens[indiceImagem];
}

// LIMPA LISTA
empresas.innerHTML = "";

// SE EXISTIREM EMPRESAS
if (imovel.empresas && imovel.empresas.length > 0) {
    imovel.empresas.forEach(emp => {
        const div = document.createElement("div");
        div.className = "empresa";
        div.innerHTML = `
            <img src="${emp.logo}" alt="${emp.nome}">
            <p>${emp.nome}</p>
        `;
        div.onclick = () => contatoEmpresa(emp);
        empresas.appendChild(div);
    });
}

// SEMPRE MOSTRA O DONO (fallback principal)
const dono = document.createElement("div");
dono.className = "empresa dono";
dono.innerHTML = `
    <p>Não tem imobiliaria ou corretor cadastrado?</p>
    <button onclick="abrirModalContato()">
        Quero que entrem em contato comigo
    </button>

`;
dono.onclick = contatoDireto;

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
          <h4>${imovel.tipo.toUpperCase()} — ${imovel.bairro}</h4>
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

  const nome = document.getElementById("contato-nome").value;
  const telefone = document.getElementById("contato-telefone").value;
  const email = document.getElementById("contato-email").value;

  // 🔴 AQUI É ONDE VAI PARA VOCÊ
  // Por enquanto vamos enviar via WhatsApp (simples)
  // depois podemos trocar por banco, email, formulário etc

  const mensagem = `
Novo contato do site

Nome: ${nome}
Telefone: ${telefone}
Email: ${email}
Imóvel: ${imovel.tipo.toUpperCase()} - ${imovel.bairro} (ID ${imovel.id})
  `;

  window.open(
    `https://wa.me/5537998090048?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );

  fecharModalContato();
});



