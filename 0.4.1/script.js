// forma de cada bloco de habilidade
/*div class="skill">
    <div class="skill-img">Imagem</div>
    <div class="skill-info">
        <div class="skill-title">Flexão de Joelhos</div>
        <div class="skill-desc">Flexão básica com apoio dos joelhos, ideal para iniciantes.</div>
    </div>
</div>
*/

function ordenarCamadas(camadas) {
    // ordena os elementos de cada camada de forma a ficarem mais proximos dos seus pré-requisitos
    let ordenadas = [];
    // primeira camada em ordem alfabética
    ordenadas.push((camadas.shift()).sort((a, b) => {
         const nomeA = habilidades.find(h => h.node === a).nome.toLowerCase();
         const nomeB = habilidades.find(h => h.node === b).nome.toLowerCase();
            if (nomeA < nomeB) return -1;
            if (nomeA > nomeB) return 1;
            return 0;
    }));
    ordenadas[0].forEach((habilidade, index) => {
        habilidade.index = index;
    });

    // para as camadas seguintes usar as colunas como referencia
    // para cada camada, ordenar os elementos com base na proximidade dos pré-requisitos anteriores
    camadas.forEach((camada) => {

        const colunaMap = new Map();
        ordenadas.forEach((anteriores) => {
            anteriores.forEach((habilidade, colIndex) => {
                const key = habilidades.find(h => h.node === habilidade).key;
                colunaMap.set(key, colIndex);
            }); 
        }); // agora colunaMap tem a chave da habilidade como chave e o índice da coluna como valor

        // ordenar a camada atual com base na média dos índices das colunas dos pré-requisitos
        const camadaOrdenada = camada.slice().sort((a, b) => { // copia a camada para não modificar o original
            const preReqA = habilidades.find(h => h.node === a).pre_requisitos; // pré-requisitos da habilidade A
            const preReqB = habilidades.find(h => h.node === b).pre_requisitos; // pré-requisitos da habilidade B
            const medColA = preReqA.length > 0 ? (preReqA.map(req => colunaMap.get(req) ?? Infinity).reduce((sum, val) => sum + val, 0) / preReqA.length) : Infinity;
            const medColB = preReqB.length > 0 ? (preReqB.map(req => colunaMap.get(req) ?? Infinity).reduce((sum, val) => sum + val, 0) / preReqB.length) : Infinity;
            return medColA - medColB;
        });
        camadaOrdenada.forEach((habilidade, index) => {
            habilidade.index = index;
            habilidade.posicaoRelativa = index - (camadaOrdenada.length-1)/2;
        });
        ordenadas.push(camadaOrdenada);
    });
    return ordenadas;
}

function criarCamada(filhos = []) {
    const camada = document.createElement('div');
    camada.classList.add('camada');

    filhos.forEach(filho => {
        camada.appendChild(filho);
    });

    return camada;
}

// Função para criar um elemento de habilidade
function criarHabilidade(key,nome, imagemUrl, descricao) {
    const node = document.createElement('div');
    node.classList.add('skill');
    node.id = key;

    const skillImg = document.createElement('div');
    skillImg.classList.add('skill-img');
    const img = document.createElement('img');
    img.src = imagemUrl;
    img.alt = nome;
    skillImg.appendChild(img);

    const skillInfo = document.createElement('div');
    skillInfo.classList.add('skill-info');

    const skillTitle = document.createElement('div');
    skillTitle.classList.add('skill-title');
    skillTitle.textContent = nome;

    const skillDesc = document.createElement('div');
    skillDesc.classList.add('skill-desc');
    skillDesc.textContent = descricao || '';

    skillInfo.appendChild(skillTitle);
    skillInfo.appendChild(skillDesc);

    node.appendChild(skillImg);
    node.appendChild(skillInfo);

    return node;
}
// cria setas entre as habilidades usando svg (sera substituido)
function criarSetas(ligações, container) { 
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const containerBox = container.getBoundingClientRect();

    const defs = document.createElementNS(svgNS, "defs");
    const marker = document.createElementNS(svgNS, "marker");

    ligações.forEach(ligação => {
        // lógica para posicionar as setas entre as habilidades

        // pegar a posição dos elementos e criar a seta entre eles
        const inicioBox = ligação[0].getBoundingClientRect();
        const fimBox = ligação[1].getBoundingClientRect();
        

        // Criar marcador de seta (precisa diminuir o tamanho depois)
        marker.setAttribute("id", "arrowhead");
        marker.setAttribute("markerWidth", "5");
        marker.setAttribute("markerHeight", "3");
        marker.setAttribute("refX", "0");
        marker.setAttribute("refY", "1.5");
        marker.setAttribute("orient", "auto");
        const arrowPath = document.createElementNS(svgNS, "path");
        arrowPath.setAttribute("d", "M0,0 L0,3 L5,1.5 z"); // Triângulo
        arrowPath.setAttribute("fill", "black");
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);
        

        // Ajustar as coordenadas relativas ao container de setas
        
        const inicioX = (inicioBox.left + inicioBox.right) / 2 - containerBox.left;
        const inicioY = inicioBox.bottom - containerBox.top;
        const fimX    = (fimBox.left + fimBox.right) / 2 - containerBox.left;
        const fimY    = fimBox.top - containerBox.top;
        
        const path = document.createElementNS(svgNS, "path");

        path.setAttribute("d", `M ${inicioX} ${inicioY} C ${inicioX} ${(inicioY + fimY) / 2} , ${fimX} ${(inicioY + fimY) / 2} , ${fimX} ${fimY}`);
        path.setAttribute("stroke", "black");
        path.setAttribute("stroke-width", "5");
        path.setAttribute("fill", "none");
        path.setAttribute("marker-end", "url(#arrowhead)");
        path.id = `path-${ligação[0].id}-to-${ligação[1].id}`;
        svg.appendChild(path);
    })
    return svg;
}

function criarDivSetas(ligações, container) {
    const setasContainer = document.createElement('div');
    setasContainer.classList.add('setas-container');
    
    setasContainer.appendChild(criarSetas(ligações,container));

    return setasContainer;
}

function criarCamadas(habilidades) {
    let camadas = [];
    let habilidadesNaoMapeadas = [...habilidades]; // Copia das habilidades para rastrear as não mapeadas
    // camada 0: habilidades sem requisitos
    // camada 1: habilidades que dependem da camada 0
    // camada 2: habilidades que dependem da camada 1
    // e assim por diante...

    while (habilidadesNaoMapeadas.length > 0) {
        console.log('Habilidades não mapeadas:', habilidadesNaoMapeadas.map(h => h.nome));
        habilidadesNaoMapeadas.forEach(habilidade => {
            if (habilidade.pre_requisitos.length === 0) {
                // Habilidade sem requisitos, vai para a camada 0
                if (!camadas[0]) camadas[0] = [];
                camadas[0].push(habilidade.node);
                habilidadesNaoMapeadas = habilidadesNaoMapeadas.filter(h => h !== habilidade);
            } else {
                // Verifica se todos os requisitos já estão mapeados
                const requisitosMapeados = habilidade.pre_requisitos.every(req => {
                    return camadas.some(camada => camada.some(h => h.id === req));
                });
                if (requisitosMapeados) {
                    // Encontra a camada mais alta dos requisitos
                    let maxCamada = -1;
                    habilidade.pre_requisitos.forEach(req => {
                        camadas.forEach((camada, index) => {
                            if (camada.some(h => h.id === req)) {
                                if (index > maxCamada) maxCamada = index;
                            }
                        });
                    });
                    const novaCamadaIndex = maxCamada + 1;
                    if (!camadas[novaCamadaIndex]) camadas[novaCamadaIndex] = [];
                    camadas[novaCamadaIndex].push(habilidade.node);
                    habilidadesNaoMapeadas = habilidadesNaoMapeadas.filter(h => h !== habilidade);
                }
            }
        });
    }
    return ordenarCamadas(camadas);
}

function getCamadaIndex(node, camadas) {
    for (let i = 0; i < camadas.length; i++) if (camadas[i].includes(node)) return i;
    return -1;
}

function criarLigações(habilidades, camadas) {

    let ligações = [];
    habilidades.forEach(habilidade => {
        const camadaHabilidade = getCamadaIndex(habilidade.node, camadas);
        habilidade.pre_requisitos.forEach(req => {
            const pai = habilidades.find(h => h.key === req);
            if (pai) {
                const camadaPai = getCamadaIndex(pai.node, camadas);
                if (camadaPai + 1 === camadaHabilidade) {
                    ligações.push([pai.node, habilidade.node]);
                } else{
                    // ligação entre camadas não adjacentes
                    let tempPai = pai, i = 1;
                    let meios = [];
                    while (camadaPai + i < camadaHabilidade) {
                        // criar nó intermediário fictício
                        const nodoIntermediário = document.createElement('div');    
                        nodoIntermediário.classList.add('nodo-intermediario');
                        nodoIntermediário.id = `intermediario-${tempPai.key}-to-${habilidade.key}-layer-${camadaPai + i}`;
                        //camadas[camadaPai + i].push(nodoIntermediário);
                        meios.push({node:nodoIntermediário,camada:camadaPai + i});
                        ligações.push([pai.node, nodoIntermediário]);
                        tempPai.node = nodoIntermediário; // atualizar o pai para o próximo nó intermediário
                        i++;
                    }
                    // encontrar a posição correta para inserir cada nó intermediário
                    let maiorCamada = -1;
                    camadas.forEach((camada) => {
                        if (camada.length > maiorCamada) maiorCamada = camada.length;
                    });
                    let index = -1;
                    while (meios.length > 0) {
                        const meio = meios.shift();
                        index = -1;
                        
                        const posicaoRelativa = (pai.posicaoRelativa + (pai.posicaoRelativa - habilidade.posicaoRelativa)* ((meio.camada - camadaPai)/(camadaHabilidade - camadaPai))) / 2;
                        index = Math.round(posicaoRelativa + (camadas[meio.camada].length-1)/2);
                        meio.node.index = index+0,5; // para evitar conflitos de índice
                        meio.node.posicaoRelativa = posicaoRelativa;
                        // inserir o nó intermediário na camada correta, mantendo a ordem
                        camadas[meio.camada].splice(index, 0, meio.node);
                        console.log(`Inserido nó intermediário ${meio.node.id} na camada ${meio.camada} na posição ${index}`);
                    }


                    ligações.push([tempPai.node, habilidade.node]);
                }
            }
        });
    });
    return ligações;
}

async function carregarHabilidadesJSON() {
    const response = await fetch('habilidades.json');
    const data = await response.json();
    return data.habilidades; // ou return data.habilidades, se quiser só o array específico
}



// Função para gerar a árvore de habilidades

async function gerarArvoreDeHabilidades() {
    const container = document.getElementById('arvore-container');

    // Habilidades 
    habilidades = await carregarHabilidadesJSON(); // Carrega do JSON
    
    // Criar nodes para cada habilidade
    habilidades.forEach(habilidade => {
        habilidade.node = criarHabilidade(habilidade.key, habilidade.nome, habilidade.imagem, habilidade.descricao);
    });
    
    camadas = criarCamadas(habilidades); // Cada sub-array representa uma camada na árvore
    
    ligações = criarLigações(habilidades, camadas); // Criar ligações entre os nodes
    
    // Criar e adicionar camadas ao container
    camadas.forEach(camada => {
        const camadaNode = criarCamada(camada);
        container.appendChild(camadaNode);
    });
    
    // Estrutura de hierarquia
    const nodoPrincipal = document.createElement('div');
    nodoPrincipal.classList.add('nodo-principal');

    // Adicionar tudo ao container principal
    container.appendChild(nodoPrincipal);

    // Adicionar setas entre as camadas
    const containerSetas = criarDivSetas(ligações, container);
    container.appendChild(containerSetas);

}

// Chama a função
gerarArvoreDeHabilidades();
