habilidades = [
        {   "key":"flexao-de-braco",
            "nome": "Flexão de Braço",
            "imagem": "img/flexao_de_braco.png",
            "descricao": "Um exercício básico que trabalha o peitoral, tríceps e ombros.",
            "pre_requisitos": []
        },
        {   "key": "barra-australiana",
            "nome": "Barra Australiana",
            "imagem": "img/barra_australiana.png",
            "descricao": "Exercício de puxada com o corpo inclinado, ótimo para iniciantes.",
            "pre_requisitos": []
        },
        {   "key": "barra-fixa",
            "nome": "Barra Fixa",
            "imagem": "img/barra_fixa.png",
            "descricao": "Exercício que fortalece as costas e os bíceps.",
            "pre_requisitos": ["barra-australiana"]
        },
         
        { "key":"pistol-squat",
            "nome": "Pistol Squat",
            "imagem": "img/pistol_squat.png",
            "descricao": "Agachamento unipodal que trabalha a força das pernas.",
            "pre_requisitos": ["agachamento"]
        },
        {   "key": "handstand",
            "nome": "Handstand",
            "imagem": "img/handstand.png",
            "descricao": "Equilíbrio em posição de cabeça para baixo, que fortalece os ombros.",
            "pre_requisitos": ["flexao-de-braco", "barra-fixa"]
        },
        {   "key": "muscle-up",
            "nome": "Muscle Up",
            "imagem": "img/muscle_up.png",
            "descricao": "Combinação de puxada e empurrada em uma única movimentação.",
            "pre_requisitos": ["barra-fixa", "flexao-de-braco"]
        },
        {   "key": "skin-the-cat",
            "nome": "Skin the Cat",
            "imagem": "img/skin_the_cat.png",
            "descricao": "Movimento de ginástica que envolve girar o corpo ao redor da barra.",
            "pre_requisitos": ["barra-fixa"]
        },
        {   "key": "agachamento",
            "nome": "Agachamento",
            "imagem": "img/agachamento.png",
            "descricao": "Exercício fundamental para fortalecer as pernas e glúteos.",
            "pre_requisitos": []
        },
        {   "key": "burpee",
            "nome": "Burpee",
            "imagem": "img/burpee.png",
            "descricao": "Exercício que combina agachamento, flexão e salto.",
            "pre_requisitos": ["flexao-de-braco"]
        },
        {   "key": "plank",
            "nome": "Prancha (Plank)",
            "imagem": "img/plank.png",
            "descricao": "Exercício isométrico que fortalece o core.",
            "pre_requisitos": []
        },
        {   "key": "leg-raise",
            "nome": "Elevação de Pernas (Leg Raise)",
            "imagem": "img/leg_raise.png",
            "descricao": "Exercício que trabalha os músculos abdominais inferiores.",
            "pre_requisitos": ["plank"]
        },
        {   "key": "dips",
            "nome": "Dips",
            "imagem": "img/dips.png",
            "descricao": "Exercício que fortalece os tríceps, peitoral e ombros.",
            "pre_requisitos": ["flexao-de-braco"]
        },
        {   "key": "l-sit",
            "nome": "L-Sit",
            "imagem": "img/l_sit.png",
            "descricao": "Exercício isométrico que fortalece o core e os flexores do quadril.",
            "pre_requisitos": ["plank", "leg-raise"]
        },
        {   "key": "dragon-flag",
            "nome": "Dragon Flag",
            "imagem": "img/dragon_flag.png",
            "descricao": "Exercício avançado para fortalecer o core, onde o corpo é mantido reto enquanto se abaixa e levanta.",
            "pre_requisitos": ["l-sit", "leg-raise"]
        },
        {   "key": "front-lever",
            "nome": "Front Lever",
            "imagem": "img/front_lever.png",
            "descricao": "Exercício avançado que fortalece o core e as costas.",
            "pre_requisitos": ["dragon-flag", "barra-fixa"]
        },
        {   "key": "back-lever",
            "nome": "Back Lever",
            "imagem": "img/back_lever.png",
            "descricao": "Exercício avançado que fortalece o core e as costas.",
            "pre_requisitos": ["dragon-flag", "barra-fixa"]
        },
        {   "key": "human-flag",
            "nome": "Human Flag",
            "imagem": "img/human_flag.png",
            "descricao": "Exercício avançado que exige força e equilíbrio para manter o corpo horizontalmente.",
            "pre_requisitos": ["front-lever", "back-lever"]
        },
        {   "key": "one-arm-pullup",
            "nome": "One-Arm Pull-Up",
            "imagem": "img/one_arm_pullup.png",
            "descricao": "Puxada com um braço, exercício extremamente avançado para força máxima.",
            "pre_requisitos": ["barra-fixa", "muscle-up"]
        },
        {   "key": "one-arm-handstand",
            "nome": "One-Arm Handstand",
            "imagem": "img/one_arm_handstand.png",
            "descricao": "Equilíbrio em posição de cabeça para baixo com um braço, exercício de elite para força e equilíbrio.",
            "pre_requisitos": ["handstand", "muscle-up"]
        },
        {   "key": "planche",
            "nome": "Planche",
            "imagem": "img/planche.png",
            "descricao": "Exercício isométrico avançado que exige força total do corpo para manter o equilíbrio horizontal.",
            "pre_requisitos": ["l-sit", "handstand"]
        },
        {   "key": "planche-pushup",
            "nome": "Planche Push-Up",
            "imagem": "img/planche_pushup.png",
            "descricao": "Flexão de braço na posição de planche, exercício de elite para força máxima.",
            "pre_requisitos": ["planche", "flexao-de-braco"]
        },
        {   "key": "one-arm-handstand-pushup",
            "nome": "One-Arm Handstand Push-Up",
            "imagem": "img/one_arm_handstand_pushup.png",
            "descricao": "Flexão de braço na posição de handstand com um braço, exercício de elite para força e equilíbrio.",
            "pre_requisitos": ["one-arm-handstand", "flexao-de-braco"]
        },
        {   "key": "human-flag-pullup",
            "nome": "Human Flag Pull-Up",
            "imagem": "img/human_flag_pullup.png",
            "descricao": "Puxada na posição de human flag, exercício de elite para força máxima.",
            "pre_requisitos": ["human-flag", "one-arm-pullup"]
        },
        {   "key": "one-arm-front-lever",
            "nome": "One-Arm Front Lever",
            "imagem": "img/one_arm_front_lever.png",
            "descricao": "Front lever com um braço, exercício extremamente avançado para força máxima.",
            "pre_requisitos": ["front-lever", "one-arm-pullup"]
        },
        {   "key": "one-arm-back-lever",
            "nome": "One-Arm Back Lever",
            "imagem": "img/one_arm_back_lever.png",
            "descricao": "Back lever com um braço, exercício extremamente avançado para força máxima.",
            "pre_requisitos": ["back-lever", "one-arm-pullup"]
        },
        {   "key": "one-arm-planche",
            "nome": "One-Arm Planche",
            "imagem": "img/one_arm_planche.png",
            "descricao": "Planche com um braço, exercício de elite para força máxima.",
            "pre_requisitos": ["planche", "one-arm-handstand"]
        },
        {   "key": "one-arm-planche-pushup",
            "nome": "One-Arm Planche Push-Up",
            "imagem": "img/one_arm_planche_pushup.png",
            "descricao": "Flexão de braço na posição de one-arm planche, exercício de elite para força máxima.",
            "pre_requisitos": ["one-arm-planche", "planche-pushup"]
        },
        {   "key": "one-arm-human-flag",
            "nome": "One-Arm Human Flag",
            "imagem": "img/one_arm_human_flag.png",
            "descricao": "Human flag com um braço, exercício de elite para força máxima.",
            "pre_requisitos": ["human-flag", "one-arm-planche"]
        },
        {   "key": "one-arm-human-flag-pullup",
            "nome": "One-Arm Human Flag Pull-Up",
            "imagem": "img/one_arm_human_flag_pullup.png",
            "descricao": "Puxada na posição de one-arm human flag, exercício de elite para força máxima.",
            "pre_requisitos": ["one-arm-human-flag", "human-flag-pullup"]
        },
        {   "key": "one-arm-dragon-flag",
            "nome": "One-Arm Dragon Flag",
            "imagem": "img/one_arm_dragon_flag.png",
            "descricao": "Dragon flag com um braço, exercício extremamente avançado para força máxima.",
            "pre_requisitos": ["dragon-flag", "one-arm-front-lever", "one-arm-back-lever"]
        },
        {   "key": "one-arm-leg-raise",
            "nome": "One-Arm Leg Raise",
            "imagem": "img/one_arm_leg_raise.png",
            "descricao": "Elevação de pernas com um braço, exercício avançado para fortalecer os músculos abdominais.",
            "pre_requisitos": ["leg-raise", "one-arm-dragon-flag"]
        }   
    ]

def detectar_ciclos_e_invalidos(habilidades):
    # Mapear key -> habilidade
    mapa = {h['key']: h for h in habilidades}

    visitado = set()
    pilha = set()
    ciclos = []
    invalidos = []

    def dfs(no):
        if no not in mapa:
            invalidos.append(no)
            return False
        if no in pilha:
            ciclos.append(no)
            return True
        if no in visitado:
            return False

        pilha.add(no)
        visitado.add(no)

        for pre in mapa[no]['pre_requisitos']:
            if dfs(pre):
                ciclos.append(no)
                return True
        pilha.remove(no)
        return False

    # Rodar DFS para cada habilidade
    for habilidade in mapa.keys():
        dfs(habilidade)

    # Remover duplicatas da lista de ciclos
    ciclos_unicos = list(set(ciclos))
    invalidos_unicos = list(set(invalidos))

    return ciclos_unicos, invalidos_unicos

ciclos, invalidos = detectar_ciclos_e_invalidos(habilidades)

print("Habilidades com ciclo de dependência:", ciclos)
print("Pré-requisitos inválidos (não encontrados):", invalidos)
