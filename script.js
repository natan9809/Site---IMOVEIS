let filtrosAtivos = {};
let tipoSelecionado = "";
let ordenacaoAtual = { campo: null, direcao: null };
let modoAlterarTipo = false;
let avisoAberto = false;



const imoveis = [
    {
        titulo: "Lote no Centro",
        tipo: "lote",
        bairro: "Centro",
        cidade: "Itaúna - MG",
        preco: 120000,
        tamanho: 300,
        imagem: "https://images.homify.com/v1448129217/p/photo/image/1135013/7.jpg",
        whatsapp: "5531999999999"
    },
    {
        titulo: "Casa no Santanense",
        tipo: "casa",
        bairro: "Santanense",
        cidade: "Itaúna - MG",
        preco: 350000,
        tamanho: 180,
        imagem: "https://images.homify.com/v1448129217/p/photo/image/1135013/7.jpg",
        whatsapp: "5531999999999"
    },
    {
        titulo: "Lote São Bento",
        tipo: "lote",
        bairro: "Sao Bento",
        cidade: "Itaúna - MG",
        preco: 95000,
        tamanho: 250,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Fm4cZI93rFq0kC6HmUzNH6m7Ig62HwJxnNuNNtcPlQ&s",
        whatsapp: "5531999999999"
    }
];

function proximaPergunta() {
    const tipo = document.getElementById("tipo-imovel").value;

    if (!tipo) {
        alert("Selecione uma opção");
        return;
    }

    document.getElementById("pergunta1").style.display = "none";

    if (tipo === "olhando") {
        fecharModal();
    } else {
        document.getElementById("pergunta2").style.display = "block";
    }
}

function selectTipo(tipo) {
    tipoSelecionado = tipo;

    // Se estiver alterando tipo, troca direto
    if (modoAlterarTipo) {
        modoAlterarTipo = false;
        fecharModal();
        atualizarTela();
        return;
    }

    document.getElementById("step1").style.display = "none";

    if (tipo === "olhando") {
        fecharModal();
    } else {
        document.getElementById("step2").style.display = "block";
    }
}

function mostrarFiltros() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";

    ativarSelecaoFiltros();
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function irParaCampos() {
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";

    const container = document.getElementById("campos-filtros");
    container.innerHTML = "";

    document.querySelectorAll("#selecao-filtros button.ativo").forEach(botao => {
        const filtro = botao.dataset.filtro;

        // BAIRRO
        if (filtro === "bairro") {
            container.innerHTML += `
                <p><strong>Bairro</strong></p>
                <div class="filtro-botoes" data-filtro="bairro">
                    <button data-valor="Centro">Centro</button>
                    <button data-valor="Santanense">Santanense</button>
                    <button data-valor="Sao Bento">São Bento</button>
                </div>
            `;
        }

        // VALOR MIN
        if (filtro === "valorMin") {
            container.innerHTML += `
                <p><strong>Valor mínimo</strong></p>
                <div class="filtro-botoes" data-filtro="valorMin">
                    <button data-valor="80000">80 mil</button>
                    <button data-valor="100000">100 mil</button>
                    <button data-valor="150000">150 mil</button>
                </div>
            `;
        }

        // VALOR MAX
        if (filtro === "valorMax") {
            container.innerHTML += `
                <p><strong>Valor máximo</strong></p>
                <div class="filtro-botoes" data-filtro="valorMax">
                    <button data-valor="200000">200 mil</button>
                    <button data-valor="300000">300 mil</button>
                    <button data-valor="500000">500 mil</button>
                </div>
            `;
        }

        // TAMANHO
        if (filtro === "tamanho") {
            container.innerHTML += `
                <p><strong>Tamanho mínimo</strong></p>
                <div class="filtro-botoes" data-filtro="tamanho">
                    <button data-valor="150">150 m²</button>
                    <button data-valor="200">200 m²</button>
                    <button data-valor="300">300 m²</button>
                </div>
            `;
        }
    });

    ativarEventosBotoesFiltro();
}


function aplicarFiltros() {
    atualizarTela();
    fecharModal();
}

function renderizarImoveis(listaImoveis) {
    const lista = document.getElementById("lista-imoveis");
    lista.innerHTML = "";

    if (listaImoveis.length === 0) {
        mostrarModalNenhumImovel();
        return;
    }

    listaImoveis.forEach(imovel => {
        lista.innerHTML += `
            <div class="card">
                <img src="${imovel.imagem}">
                <h2>${imovel.titulo}</h2>
                <p>📍 ${imovel.bairro} - ${imovel.cidade}</p>
                <p>📐 ${imovel.tamanho} m²</p>
                <p>💰 R$ ${imovel.preco.toLocaleString("pt-BR")}</p>
                <a href="https://wa.me/${imovel.whatsapp}" target="_blank">
                    Falar no WhatsApp
                </a>
            </div>
        `;
    });
}

function mostrarFiltrosAtivos() {
    const area = document.getElementById("filtros-ativos");
    area.innerHTML = "";

    // A barra SEMPRE visível
    area.style.display = "flex";

    // Botões SEMPRE presentes
    area.innerHTML += `
        <button id="alterar-tipo" onclick="abrirAlterarTipo()">Alterar tipo</button>
        <button id="alterar-filtros" onclick="abrirAlterarFiltros()">Alterar filtros</button>
        <button id="limpar-tudo" onclick="limparTudo()">Limpar tudo</button>
    `;
}


function removerFiltro(chave) { // NÃO chamar render direto, usar atualizarTela()
    filtrosAtivos[chave] = null;
    atualizarTela();
}


function abrirAlterarFiltros() { //ALTERAR FILTROS
    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";
}

function ordenar(campo, direcao) {
    ordenacaoAtual = { campo, direcao };
    atualizarTela();
}



window.onload = () => { // Inicialização segura da aplicação
    atualizarTela()
    document.getElementById("modal").style.display = "flex";
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";

};


function limparTudo() { //DEVE LIMPRAR O FILTRO
     filtrosAtivos = {
        bairro: null,
        valorMin: null,
        valorMax: null,
        tamanho: null
    };

    tipoSelecionado = null;
    ordenacaoAtual = { campo: null, direcao: null };

    // remove visual ativo dos botões
    document.querySelectorAll(".filtro-botoes button").forEach(btn => {
        btn.classList.remove("ativo");
    });

    atualizarTela();
}

function atualizarTela() {
    let resultado = imoveis.filter(imovel => {

        if (tipoSelecionado && imovel.tipo !== tipoSelecionado) return false;
        if (filtrosAtivos.bairro && imovel.bairro !== filtrosAtivos.bairro) return false;
        if (filtrosAtivos.valorMin && imovel.preco < filtrosAtivos.valorMin) return false;
        if (filtrosAtivos.valorMax && imovel.preco > filtrosAtivos.valorMax) return false;
        if (filtrosAtivos.tamanho && imovel.tamanho < filtrosAtivos.tamanho) return false;

        return true;
    });

    if (ordenacaoAtual.campo) {
        resultado.sort((a, b) =>
            ordenacaoAtual.direcao === "asc"
                ? a[ordenacaoAtual.campo] - b[ordenacaoAtual.campo]
                : b[ordenacaoAtual.campo] - a[ordenacaoAtual.campo]
        );
    }

    renderizarImoveis(resultado);
    mostrarFiltrosAtivos();
}



function abrirAlterarTipo() { // OBS: Alterar tipo pelo 
    modoAlterarTipo = true;

    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";
}


function fecharModalAviso() {
    avisoAberto = false;
    document.getElementById("modal-aviso").style.display = "none";
}


function fecharModalAviso() {
    document.getElementById("modal-aviso").style.display = "none";
}

function confirmarNenhumImovel() {
    fecharModalAviso();
    limparTudo();
}



function ativarEventosBotoesFiltro() {
    document.querySelectorAll(".filtro-botoes").forEach(grupo => {
        const filtro = grupo.dataset.filtro;

        grupo.querySelectorAll("button").forEach(botao => {
            botao.onclick = () => {
                // desativa outros do mesmo grupo
                grupo.querySelectorAll("button").forEach(b => b.classList.remove("ativo"));

                // ativa o clicado
                botao.classList.add("ativo");

                // salva valor
                filtrosAtivos[filtro] = botao.dataset.valor;
            };
        });
    });
}


function ativarSelecaoFiltros() {
    const botoes = document.querySelectorAll("#selecao-filtros button");
    const botaoProximo = document.getElementById("btnProximo");

    botoes.forEach(btn => {
        btn.onclick = () => {
            btn.classList.toggle("ativo");

            const algumAtivo = [...botoes].some(b => b.classList.contains("ativo"));
            botaoProximo.disabled = !algumAtivo;
        };
    });
}



console.log("Site carregado com sucesso!");