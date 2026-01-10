let filtrosAtivos = {};
let tipoSelecionado = "";
let ordenacaoAtual = { campo: null, direcao: null };
let modoAlterarTipo = false;
let avisoAberto = false;
let imoveis = IMOVEIS;


window.onload = () => { // Inicialização segura da aplicação
    atualizarTela()
    document.getElementById("modal").style.display = "flex";
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";

};


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

    // some o texto institucional
    document.getElementById("intro-texto").style.display = "none";

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

            let opcoesBairro = `<option value="">Selecione</option>`;

            BAIRROS.forEach(bairro => {
                opcoesBairro += `<option value="${bairro}">${bairro}</option>`;
            });

            container.innerHTML += `
                <label><strong>Bairro</strong></label>
                <select id="filtro-bairro">
                    ${opcoesBairro}
                </select>
            `;
        }


        // VALOR MIN
        if (filtro === "valorMin") {
                container.innerHTML += `
                    <label><strong>Valor mínimo</strong></label>
                    <input type="number" id="filtro-min" placeholder="Ex: 100000">
                `;
            }

        // VALOR MAX
        if (filtro === "valorMax") {
                container.innerHTML += `
                    <label><strong>Valor máximo</strong></label>
                    <input type="number" id="filtro-max" placeholder="Ex: 300000">
                `;
            }

        // TAMANHO
        if (filtro === "tamanho") {
                container.innerHTML += `
                    <label><strong>Tamanho mínimo (m²)</strong></label>
                    <input type="number" id="filtro-tamanho" placeholder="Ex: 200">
                `;
            }
    });

    ativarEventosBotoesFiltro();
}


function aplicarFiltros() {
    filtrosAtivos = {
        bairro: document.getElementById("filtro-bairro")?.value || null,
        valorMin: document.getElementById("filtro-min")?.value || null,
        valorMax: document.getElementById("filtro-max")?.value || null,
        tamanho: document.getElementById("filtro-tamanho")?.value || null
    };
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
                <h2>${imovel.tipo.toUpperCase()} no Bairro ${imovel.bairro}</h2>
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
    modoAlterarTipo = true;

    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    // MOSTRA o texto novamente
    document.getElementById("intro-texto").style.display = "block"

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";



    /// 🔹 garante múltipla seleção funcionando
    const botoes = document.querySelectorAll("#selecao-filtros button");
    const botaoProximo = document.getElementById("btnProximo");

    let algumAtivo = false;

    botoes.forEach(btn => {
        btn.classList.remove("ativo"); // limpa visual

        btn.onclick = () => {
            btn.classList.toggle("ativo");

            algumAtivo = [...botoes].some(b =>
                b.classList.contains("ativo")
            );

            botaoProximo.disabled = !algumAtivo;
        };
    });
    botaoProximo.disabled = true;

}

function ordenar(campo, direcao) {
    ordenacaoAtual = { campo, direcao };
    atualizarTela();
}






function limparTudo() { //DEVE LIMPRAR O FILTRO E ORDANAÇÃO
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
    atualizarTextoOrdenacao();
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

    if (resultado.length > 0) {
        mostrarFiltrosAtivos();
    } else {
        esconderFiltrosAtivos();
    }
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


function confirmarNenhumImovel() {
    fecharModalAviso();
    limparTudo();
        // Garante que o modal inicial volte
    document.getElementById("modal").style.display = "flex";
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";

    // Texto institucional volta (se você aplicou a melhoria anterior)
    document.getElementById("intro-texto").style.display = "block";
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

function alternarOrdenacao(campo) {
    // Se clicou no mesmo campo → alterna direção
    if (ordenacaoAtual.campo === campo) {
        ordenacaoAtual.direcao =
            ordenacaoAtual.direcao === "desc" ? "asc" : "desc";
    } else {
        // Se mudou de campo → começa em desc
        ordenacaoAtual.campo = campo;
        ordenacaoAtual.direcao = "desc";
    }

    atualizarTextoOrdenacao();
    atualizarTela();
}

function atualizarTextoOrdenacao() { //para atualizar o texto
    const btnPreco = document.getElementById("ord-preco");
    const btnTamanho = document.getElementById("ord-tamanho");

    // limpa estado visual
    btnPreco.classList.remove("ativo");
    btnTamanho.classList.remove("ativo");

    // Preço
    if (ordenacaoAtual.campo === "preco") {
        btnPreco.innerText =
            ordenacaoAtual.direcao === "asc" ? "Preço ↑" : "Preço ↓";
        btnPreco.classList.add("ativo");
    } else {
        btnPreco.innerText = "Preço -";
    }

    // Tamanho
    if (ordenacaoAtual.campo === "tamanho") {
        btnTamanho.innerText =
            ordenacaoAtual.direcao === "asc" ? "Tamanho ↑" : "Tamanho ↓";
        btnTamanho.classList.add("ativo");
    } else {
        btnTamanho.innerText = "Tamanho -";
    }
}

function esconderFiltrosAtivos() {
    const area = document.getElementById("filtros-ativos");
    area.style.display = "none";
}


console.log("Site carregado com sucesso!");