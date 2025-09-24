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
function criarSetas(inicioX, inicioY, fimX, fimY){ 
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "0");
    line.setAttribute("x2", "100%");
    line.setAttribute("y2", "100%");
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");

    
    svg.appendChild(line);
    return svg;
}

function criarDivSetas(){
    const setasContainer = document.createElement('div')
    setasContainer.classList.add('setas-container')
    //obter as posições das habilidades e criar as setas dinamicamente
    

    setasContainer.appendChild(criarSetas())

    return setasContainer
}

// Função para gerar a árvore de habilidades
function gerarArvoreDeHabilidades() {
    const container = document.getElementById('arvore-container');
    
    
    // Habilidades (refazer isso depois para pegar as habilidades a partir de um json ou banco de dados)
    const barraAustraliana = criarHabilidade('Barra Australiana', 'barra-australiana-icon.png', 'Exercício de puxada com o corpo inclinado, ótimo para iniciantes.');
    const barra = criarHabilidade('Barra', 'barra-icon.png', 'Exercício de puxada na barra fixa, desenvolve força na parte superior do corpo.');
    const skinTheCat = criarHabilidade('Skin the Cat', 'skin-the-cat-icon.png', 'Movimento de ginástica que envolve girar o corpo ao redor da barra.');
    const muscleUp = criarHabilidade('Muscle Up', 'muscle-up-icon.png', 'Movimento avançado que combina uma puxada e um empurrão para subir acima da barra.');
    
    //geração estatica de camadas, alterar depois para ser dinamico usando os requisitos de cada habilidade
    camadas = [[barraAustraliana], [barra], [skinTheCat, muscleUp]]; // Cada sub-array representa uma camada na árvore 

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
    const containerSetas = criarDivSetas();
    container.appendChild(containerSetas);

}

// Chama a função para gerar a árvore
gerarArvoreDeHabilidades();