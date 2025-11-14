// ...existing code...
+let habilidades = [];
+let camadas = [];
+let ligações = [];
...
 function ordenarCamadas(camadas) {
-    // ordena os elementos de cada camada de forma a ficarem mais proximos dos seus pré-requisitos
-    ordenadas = [];
+    // ordena os elementos de cada camada de forma a ficarem mais proximos dos seus pré-requisitos
+    let ordenadas = [];
     // primeira camada em ordem alfabética
     ordenadas.push((camadas.shift()).sort((a, b) => {
          const nomeA = habilidades.find(h => h.node === a).nome.toLowerCase();
          const nomeB = habilidades.find(h => h.node === b).nome.toLowerCase();
             if (nomeA < nomeB) return -1;
             if (nomeA > nomeB) return 1;
             return 0;
     }));
@@
 function ordenarintermediarios(camadas) { // estamos fazendo isso aqui agora
     // ordenar os nodos intermediários para ficarem no centro dos seus pré-requisitos e filhos
     console.log('Ordenando nodos intermediários...');
     camadas.forEach((camada, camadaIndex) => {
-        
-        avaliados = []
+        
+        let avaliados = []
         const intermediarios = camada.filter(node => node.classList.contains('nodo-intermediario'));
         intermediarios.forEach(intermediario => {
             if (avaliados.includes(intermediario)) return; // já foi avaliado
             avaliados.push(intermediario);
@@
 function criarSetas(ligações, container, camadas) { 
     const svgNS = "http://www.w3.org/2000/svg";
     const svg = document.createElementNS(svgNS, "svg");
     svg.setAttribute("width", "100%");
     svg.setAttribute("height", "100%");
 
     const containerBox = container.getBoundingClientRect();
-
-    const defs = document.createElementNS(svgNS, "defs");
-    const marker = document.createElementNS(svgNS, "marker");
+    // criar defs/marker apenas 1x
+    const defs = document.createElementNS(svgNS, "defs");
+    const marker = document.createElementNS(svgNS, "marker");
+    marker.setAttribute("id", "arrowhead");
+    marker.setAttribute("markerWidth", "8");
+    marker.setAttribute("markerHeight", "6");
+    marker.setAttribute("refX", "5");
+    marker.setAttribute("refY", "3");
+    marker.setAttribute("orient", "auto");
+    const arrowPath = document.createElementNS(svgNS, "path");
+    arrowPath.setAttribute("d", "M0,0 L0,6 L8,3 z"); // Triângulo maior
+    arrowPath.setAttribute("fill", "#ffb347");
+    marker.appendChild(arrowPath);
+    defs.appendChild(marker);
+    svg.appendChild(defs);
 
     ligações.forEach(ligação => {
@@
         path.setAttribute("stroke", "black");
         path.setAttribute("stroke-width", "5");
         path.setAttribute("fill", "none");
         path.setAttribute("marker-end", "url(#arrowhead)");
         path.id = `path-${ligação[0].id}-to-${ligação[1].id}`;
         svg.appendChild(path);
     
     })
 
     return svg;
 }
@@
 function criarLigações(habilidades, camadas) {
 
     let ligações = [];
     habilidades.forEach(habilidade => {
         let camadaHabilidade = getCamadaIndex(habilidade.node, camadas);
         habilidade.pre_requisitos.forEach(req => {
             const pai = habilidades.find(h => h.key === req);
             if (pai) {
                 let camadaPai = getCamadaIndex(pai.node, camadas);
-                if (camadaPai + 1 === camadaHabilidade) {
-                    ligações.push([pai.node, habilidade.node]);
-                } else{
+                if (camadaPai + 1 === camadaHabilidade) {
+                    ligações.push([pai.node, habilidade.node]);
+                } else {
                     // ligação entre camadas não adjacentes
-                    
-                    while (camadaPai + 1 < camadaHabilidade) {
-                        // criar nó intermediário fictício
-                        const nodoIntermediário = document.createElement('div');    
-                        nodoIntermediário.classList.add('nodo-intermediario');
-                        nodoIntermediário.id = `intermediario-${pai.key}-to-${habilidade.key}-layer-${camadaPai + 1}`;
-                        camadas[camadaPai + 1].push(nodoIntermediário);
-                        ligações.push([pai.node, nodoIntermediário]);
-                        pai.node = nodoIntermediário; // atualizar o pai para o próximo nó intermediário
-                        camadaPai++;
-                    }
-                    ligações.push([pai.node, habilidade.node]);
+                    // não mutar 'pai.node' — usar currentParent para encadear intermediários
+                    let currentParentNode = pai.node;
+                    while (camadaPai + 1 < camadaHabilidade) {
+                        const nodoIntermediário = document.createElement('div');    
+                        nodoIntermediário.classList.add('nodo-intermediario');
+                        nodoIntermediário.id = `intermediario-${pai.key}-to-${habilidade.key}-layer-${camadaPai + 1}`;
+                        camadas[camadaPai + 1].push(nodoIntermediário);
+                        ligações.push([currentParentNode, nodoIntermediário]);
+                        currentParentNode = nodoIntermediário;
+                        camadaPai++;
+                    }
+                    ligações.push([currentParentNode, habilidade.node]);
                 }
             }
         });
     });
     return ligações;
 }
 
// ...existing code...