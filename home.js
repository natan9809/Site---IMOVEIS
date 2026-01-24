let filtrosAtivos = {};
let tipoSelecionado = "";
let ordenacaoAtual = { campo: null, direcao: null };
let modoAlterarTipo = false;
let avisoAberto = false;
let imoveis = IMOVEIS;


window.onload = () => { // Inicialização segura da aplicação

    // restaura estado salvo (se existir)
    const estadoSalvo = localStorage.getItem("estadoFiltro");
    if (estadoSalvo) {
        const estado = JSON.parse(estadoSalvo);
        tipoSelecionado = estado.tipoSelecionado;
        filtrosAtivos = estado.filtrosAtivos;
        ordenacaoAtual = estado.ordenacaoAtual;
    }

    atualizarTela()

    const voltarSemModal = localStorage.getItem("voltarSemModal");

    if (voltarSemModal === "true" || tipoSelecionado || filtrosAtivos)  {
        // NÃO abre modal
        localStorage.removeItem("voltarSemModal");
        fecharModal();
    } else {

        document.getElementById("modal").style.display = "flex";
        document.getElementById("step1").style.display = "block";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "none";
        document.getElementById("step4").style.display = "none";
        document.getElementById("btn-so-olhando").style.display = "block";
    }
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
    atualizarContador();

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

    setTimeout(() => {
        document.querySelectorAll("#campos-filtros input, #campos-filtros select")
            .forEach(el => {
                el.addEventListener("input", () => {
                    filtrosAtivos.bairro = document.getElementById("filtro-bairro")?.value || null;
                    filtrosAtivos.valorMin = document.getElementById("filtro-min")?.value || null;
                    filtrosAtivos.valorMax = document.getElementById("filtro-max")?.value || null;
                    filtrosAtivos.tamanho = document.getElementById("filtro-tamanho")?.value || null;

                    atualizarContador();
                });
            });
    }, 0);


    ativarEventosBotoesFiltro();
}

function aplicarFiltros() {
    filtrosAtivos = {
        bairro: document.getElementById("filtro-bairro")?.value || null,
        valorMin: document.getElementById("filtro-min")?.value || null,
        valorMax: document.getElementById("filtro-max")?.value || null,
        tamanho: document.getElementById("filtro-tamanho")?.value || null
    };

    const resultado = imoveis.filter(imovel => {
        if (tipoSelecionado && imovel.tipo !== tipoSelecionado) return false;
        if (filtrosAtivos.bairro && imovel.bairro !== filtrosAtivos.bairro) return false;
        if (filtrosAtivos.valorMin && imovel.preco < filtrosAtivos.valorMin) return false;
        if (filtrosAtivos.valorMax && imovel.preco > filtrosAtivos.valorMax) return false;
        if (filtrosAtivos.tamanho && imovel.tamanho < filtrosAtivos.tamanho) return false;
        return true;
    });

    // ❗ SE NÃO HÁ RESULTADOS
    if (resultado.length === 0) {
        fecharModal();
        mostrarModalNenhumImovel();
        return;
    }

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
        
            <div class="card" onclick="abrirImovel(${imovel.id})">
                <img src="${imovel.imagem}">
                <h2>${imovel.tipo.toUpperCase()} no Bairro ${imovel.bairro}</h2>
                <p>📐 ${imovel.tamanho} m²</p>
                <p>💰 R$ ${imovel.preco.toLocaleString("pt-BR")}</p>
                
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

    atualizarContador();

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

    atualizarContador();

}

function abrirAlterarTipo() { // OBS: Alterar tipo pelo 
    modoAlterarTipo = true;

    const modal = document.getElementById("modal");
    modal.style.display = "flex";

    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "none";
    document.getElementById("btn-so-olhando").style.display = "none";//ESCONDE "Só olhando" ao alterar tipo

    atualizarContador();

}

function fecharModalAviso() {
    avisoAberto = false;
    document.getElementById("modal-aviso").style.display = "none";
}

function mostrarModalNenhumImovel() {
    // fecha o modal de filtros
    document.getElementById("modal").style.display = "none";

    // abre o modal de aviso
    document.getElementById("modal-aviso").style.display = "flex";
}

function confirmarNenhumImovel() {
    fecharModalAviso();

    // limpa apenas os filtros
    filtrosAtivos = {};

    // NÃO limpa o tipo selecionado
    atualizarTela();
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

function calcularQuantidadeDisponivel() {
    return imoveis.filter(imovel => {

        if (tipoSelecionado && imovel.tipo !== tipoSelecionado) return false;
        if (filtrosAtivos.bairro && imovel.bairro !== filtrosAtivos.bairro) return false;
        if (filtrosAtivos.valorMin && imovel.preco < filtrosAtivos.valorMin) return false;
        if (filtrosAtivos.valorMax && imovel.preco > filtrosAtivos.valorMax) return false;
        if (filtrosAtivos.tamanho && imovel.tamanho < filtrosAtivos.tamanho) return false;

        return true;
    }).length;
}

function atualizarContador() {
    const contador = document.getElementById("contador-disponiveis");
    if (!contador) return;

    const total = calcularQuantidadeDisponivel();

    contador.innerText =
        total === 1
            ? "1 item disponível"
            : `${total} itens disponíveis`;
}

function salvarEstado() {
    localStorage.setItem("estadoFiltro", JSON.stringify({
        tipoSelecionado,
        filtrosAtivos,
        ordenacaoAtual
    }));
}

function abrirImovel(id) {
    salvarEstado();
    window.location.href = `imovel.html?id=${id}`;
}

function voltar() {
    localStorage.setItem("voltarSemModal", "true");
    window.history.back();
}




console.log("Site carregado com sucesso!");