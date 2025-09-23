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

// Função para criar uma seta de conexão (não está funcionando)
function criarSeta() {
    const seta = document.createElement('div');
    seta.classList.add('seta'); // Classe para estilizar a seta

    return seta;
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
    
    // Conectar as habilidades com setas
    //const seta1 = criarSeta();
    //const seta2 = criarSeta();

    // Estrutura de hierarquia
    const nodoPrincipal = document.createElement('div');
    nodoPrincipal.classList.add('nodo-principal');
    
    /*
    nodoPrincipal.appendChild(barraAustraliana);
    nodoPrincipal.appendChild(seta1);
    nodoPrincipal.appendChild(barra);
    nodoPrincipal.appendChild(seta2);
    nodoPrincipal.appendChild(skinTheCat);
    nodoPrincipal.appendChild(muscleUp);
    */

    // Adicionar tudo ao container principal
    container.appendChild(nodoPrincipal);
}

// Chama a função para gerar a árvore
gerarArvoreDeHabilidades();