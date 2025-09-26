import habilidades from './habilidades.json' assert { type: 'json' };

/*div class="skill">
    <div class="skill-img">Imagem</div>
    <div class="skill-info">
        <div class="skill-title">Flexão de Joelhos</div>
        <div class="skill-desc">Flexão básica com apoio dos joelhos, ideal para iniciantes.</div>
    </div>
</div>
*/

function criarCamada(filhos = []) {
    const camada = document.createElement('div');
    camada.classList.add('camada');

    filhos.forEach(filho => {
        camada.appendChild(filho);
    });

    return camada;
}

// Função para criar um elemento de habilidade

function criarHabilidade(nome, imagemUrl, descricao) {
    const node = document.createElement('div');
    node.classList.add('skill');
    node.id = nome.replace(/\s+/g, '-').toLowerCase(); // id baseado no nome

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

// cria setas entre as habilidades usando svg
function criarSetas(ligações, container) { 
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const containerBox = container.getBoundingClientRect();


    ligações.forEach(ligação => {
        // lógica para posicionar as setas entre as habilidades

        // pegar a posição dos elementos e criar a seta entre eles
        const inicioBox = ligação[0].getBoundingClientRect();
        const fimBox = ligação[1].getBoundingClientRect();
        

        // Criar marcador de seta (precisa diminuir o tamanho depois)
        const defs = document.createElementNS(svgNS, "defs");
        const marker = document.createElementNS(svgNS, "marker");
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

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(inicioX));
        line.setAttribute("y1", String(inicioY));
        line.setAttribute("x2", String(fimX));
        line.setAttribute("y2", String(fimY));
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "10");
        line.setAttribute("marker-end", "url(#arrowhead)");
        svg.appendChild(line);
    
    })

    return svg;
}

function criarDivSetas(ligações, container){
    const setasContainer = document.createElement('div')
    setasContainer.classList.add('setas-container')
    
    setasContainer.appendChild(criarSetas(ligações,container))

    return setasContainer
}

// Função para gerar a árvore de habilidades
function gerarArvoreDeHabilidades() {
    const container = document.getElementById('arvore-container');
    let camadas = []; // Array para armazenar as camadas
    let ligações = []; // Array para armazenar as ligações entre habilidades

    // Função para organizar as habilidades em camadas    
    habilidades.forEach(habilidade => {
        habilidade.node = criarHabilidade(habilidade.nome, habilidade.imagem, habilidade.descricao);
        if (habilidade.pre_requisitos.length === 0) {
            // Se não tiver pré-requisitos, vai para a primeira camada
            if (!camadas[0]) camadas[0] = [];
            camadas[0].push(habilidade.node);
        } else {
            // Encontrar a camada mais alta dos pré-requisitos
            let camadaMaior = -1;
            habilidade.pre_requisitos.forEach(req => {
                for (let i = 0; i < camadas.length; i++) {
                    if (camadas[i].some(h => h.id === req.replace(/\s+/g, '-').toLowerCase())) {
                        if (i > camadaMaior) camadaMaior = i;
                        break;
                    }
                }
            });
            const novaCamada = camadaMaior + 1;
            if (!camadas[novaCamada]) camadas[novaCamada] = [];
            camadas[novaCamada].push(habilidade.node);

            // Adicionar ligações entre os pré-requisitos e a habilidade atual
            habilidade.pre_requisitos.forEach(req => {
                const reqNode = mapaNodes[req.toLowerCase()];
                if (reqNode) {
                    ligações.push([reqNode, habilidade.node]);
                }
                else console.warn("Pré-requisito não encontrado: ${req}");
            });
        }
    });



    /* 
    // Habilidades (refazer isso depois para pegar as habilidades a partir de um json ou banco de dados)
    const barraAustraliana = criarHabilidade('Barra Australiana', 'barra-australiana-icon.png', 'Exercício de puxada com o corpo inclinado, ótimo para iniciantes.');
    const barra = criarHabilidade('Barra', 'barra-icon.png', 'Exercício de puxada na barra fixa, desenvolve força na parte superior do corpo.');
    const skinTheCat = criarHabilidade('Skin the Cat', 'skin-the-cat-icon.png', 'Movimento de ginástica que envolve girar o corpo ao redor da barra.');
    const muscleUp = criarHabilidade('Muscle Up', 'muscle-up-icon.png', 'Movimento avançado que combina uma puxada e um empurrão para subir acima da barra.');
    
    //geração estatica de camadas, alterar depois para ser dinamico usando os requisitos de cada habilidade
    camadas = [[barraAustraliana], [barra], [skinTheCat, muscleUp]]; // Cada sub-array representa uma camada na árvore 

    ligações = [
        [barraAustraliana, barra],
        [barra, skinTheCat],
        [barra, muscleUp]
    ]; // Ligações entre habilidades (pai -> filho)
    */

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
    const containerSetas = criarDivSetas(ligações,container);
    container.appendChild(containerSetas);
}

// Chama a função para gerar a árvore
gerarArvoreDeHabilidades();