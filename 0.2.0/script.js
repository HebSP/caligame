//import './habilidades.json';

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

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(inicioX));
        line.setAttribute("y1", String(inicioY));
        line.setAttribute("x2", String(fimX));
        line.setAttribute("y2", String(fimY));
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "5");
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

function criarCamadas(habilidades) {
    let camadas = [];
    let habilidadesNaoMapeadas = [...habilidades]; // Copia das habilidades para rastrear as não mapeadas
    // camada 0: habilidades sem requisitos
    // camada 1: habilidades que dependem da camada 0
    // camada 2: habilidades que dependem da camada 1
    // e assim por diante...

    // Função recursiva para encontrar a profundidade de uma habilidade
    
    while (habilidadesNaoMapeadas.length > 0) {
        habilidadesNaoMapeadas.forEach(habilidade => {
            if (habilidade.requisitos.length === 0) {
                // Habilidade sem requisitos, vai para a camada 0
                if (!camadas[0]) camadas[0] = [];
                camadas[0].push(habilidade.node);
                habilidadesNaoMapeadas = habilidadesNaoMapeadas.filter(h => h !== habilidade);
            } else {
                // Verifica se todos os requisitos já estão mapeados
                const requisitosMapeados = habilidade.requisitos.every(req => {
                    return camadas.some(camada => camada.some(h => h.id === req.replace(/\s+/g, '-').toLowerCase()));
                });
                if (requisitosMapeados) {
                    // Encontra a camada mais alta dos requisitos
                    let maxCamada = -1;
                    habilidade.requisitos.forEach(req => {
                        camadas.forEach((camada, index) => {
                            if (camada.some(h => h.id === req.replace(/\s+/g, '-').toLowerCase())) {
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

    return camadas;
}

function criarLigações(habilidades) {
    let ligações = [];
    habilidades.forEach(habilidade => {
        habilidade.requisitos.forEach(req => {
            const pai = habilidades.find(h => h.nome === req);
            if (pai) {
                ligações.push([pai.node, habilidade.node]);
            }
        });
    });
    return ligações;
}

// Função para gerar a árvore de habilidades
function gerarArvoreDeHabilidades() {
    const container = document.getElementById('arvore-container');
    
    
    // Habilidades (refazer isso depois para pegar as habilidades a partir de um json ou banco de dados)
    habilidades = [
        { nome: 'Barra Australiana', imagem: 'barra-australiana-icon.png', descricao: 'Exercício de puxada com o corpo inclinado, ótimo para iniciantes.', requisitos: [] },
        { nome: 'Barra', imagem: 'barra-icon.png', descricao: 'Exercício de puxada na barra fixa, desenvolve força na parte superior do corpo.', requisitos: ['Barra Australiana'] },
        { nome: 'Skin the Cat', imagem: 'skin-the-cat-icon.png', descricao: 'Movimento de ginástica que envolve girar o corpo ao redor da barra.', requisitos: ['Barra'] },
        { nome: 'Muscle Up', imagem: 'muscle-up-icon.png', descricao: 'Movimento avançado que combina uma puxada e um empurrão para subir acima da barra.', requisitos: ['Barra'] }
    ];
    


    //const barraAustraliana = criarHabilidade('Barra Australiana', 'barra-australiana-icon.png', 'Exercício de puxada com o corpo inclinado, ótimo para iniciantes.');
    //const barra = criarHabilidade('Barra', 'barra-icon.png', 'Exercício de puxada na barra fixa, desenvolve força na parte superior do corpo.');
    //const skinTheCat = criarHabilidade('Skin the Cat', 'skin-the-cat-icon.png', 'Movimento de ginástica que envolve girar o corpo ao redor da barra.');
    //const muscleUp = criarHabilidade('Muscle Up', 'muscle-up-icon.png', 'Movimento avançado que combina uma puxada e um empurrão para subir acima da barra.');
    habilidades.forEach(habilidade => {
        habilidade.node = criarHabilidade(habilidade.nome, habilidade.imagem, habilidade.descricao);
    });
    
    //const barraAustraliana = habilidades.find(h => h.nome === 'Barra Australiana').node;
    //const barra = habilidades.find(h => h.nome === 'Barra').node;
    //const skinTheCat = habilidades.find(h => h.nome === 'Skin the Cat').node;
    //const muscleUp = habilidades.find(h => h.nome === 'Muscle Up').node;
    
    //geração estatica de camadas, alterar depois para ser dinamico usando os requisitos de cada habilidade
    //camadas = [[barraAustraliana], [barra], [skinTheCat, muscleUp]]; // Cada sub-array representa uma camada na árvore 

    camadas = criarCamadas(habilidades); // Cada sub-array representa uma camada na árvore
    
    /*ligações = [
        [barraAustraliana, barra],
        [barra, skinTheCat],
        [barra, muscleUp]
    ]; // Ligações entre habilidades (pai -> filho)
    */
    let ligações = criarLigações(habilidades);
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

// Chama a função para gerar a árvore
gerarArvoreDeHabilidades();