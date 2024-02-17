import {
    computePosition,
    flip,
    shift,
    offset,
} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.5.3/+esm';

const ARTIFACT_DATABASE = {
    "artefato_eco_do_sacrificio": {
        img: "/img/artefatos/Eco_do_Sacrificio.webp",
        name: "Eco do Sacrifício",
        pieces: {
            "2": "ATQ +18%.",
            "4": "Quando o Ataque Normal atinge um inimigo, tem 36% de chance de ativar o Rito do Vale, que aumenta o Dano do Ataque Normal em 70% do ATQ. Esse efeito desaparece 0.05s após um Ataque Normal causar dano. Quando o Ataque Normal não ativar o Rito do Vale, aumenta a probabilidade de ativação em 20% na próxima vez. Essa ativação pode ocorrer 1 vez a cada 0.2s.",
        },
    },
    "artefato_brilho_vourukasha": {
        img: "/img/artefatos/Brilho_Vourukasha.webp",
        name: "Brilho Vourukasha",
        pieces: {
            "2": "Aumenta a vida em 20%.",
            "4": "Aumenta o Dano da Habilidade Elemental e do Supremo em 10%. Nos 5s após o personagem que tem este artefato equipado sofrer Dano, o efeito de aumento de Dano mencionado acima será de 80%. Esse efeito de aumento pode ser acumulado até 5 vezes, com cada acúmulo tendo sua duração contada independentemente. Esse efeito pode ser desencadeado mesmo se o personagem não estiver ativo no campo de batalha.",
        },
    },
    "artefato_a_bruxa_das_chamas_carmesim": {
        img: "/img/artefatos/Bruxa_Carmesim.webp",
        name: "A Bruxa das Chamas Carmesim",
        pieces: {
            "2": "Bônus de Dano Pyro +15%",
            "4": "Aumenta o Dano causado por Sobrecarga, Queimaduras e Germinação em 40%. Aumenta o Dano causado por Vaporização e Fusão em 15%. Usar Habilidades Elementais aumenta o efeito de Bônus de Conjunto de 2 Peças em 50% do seu valor inicial por 10s. Máximo de 3 acúmulos.",
        },
    },
    "artefato_cacador_das_sombras": {
        img: "/img/artefatos/Cacador_das_Sombras.webp",
        name: "Caçador das Sombras",
        pieces: {
            "2": "Aumenta o Dano do Ataque Normal e do Ataque Carregado em 15%.",
            "4": "Quando a Vida atual aumenta ou diminui, aumenta a Taxa CRIT em 12%. Esse efeito dura 5s e pode ser acumulado até 3 vezes.",
        },
    },
    "artefato_cavaleiro_manchado_de_sangue": {
        img: "/img/artefatos/Cavaleiro_Manchado.webp",
        name: "Cavaleiro Manchado de Sangue",
        pieces: {
            "2": "Dano Físico causado +25%",
            "4": "Após derrotar um oponente, aumenta o Dano do Ataque Carregado em 50% e reduz seu custo de Stamina para 0 por 10s.",
        },
    },
    "artefato_chama_palida": {
        img: "/img/artefatos/Chama_Palida.webp",
        name: "Chama Pálida",
        pieces: {
            "2": "Dano Físico causado +25%",
            "4": "Quando a Habilidade Elemental atinge um inimigo, o Ataque aumenta em 9% por 7s. Esse efeito acumula até 2 vezes e pode ser desencadeado uma vez a cada 0.3s. Quando se possui 2 acúmulos, o efeito do conjunto de 2 Artefatos é aumentado em 100%.",
        },
    },
    "artefato_concha_tingida_pelo_mar": {
        img: "/img/artefatos/Concha_Tingida_pelo_Mar.png",
        name: "Concha Tingida Pelo Mar",
        pieces: {
            "2": "Bônus de Cura +15%",
            "4": "Quando o personagem que equipa este conjunto de artefatos cura outro personagem da sua equipe, ele cria o efeito de \"Bolha de Espuma do Mar\" durante 3s, que registra a quantidade de vida regenerada (incluindo a regenerada acima de 100%). No final da duração do efeito, a Bolha de Espuma do Mar explode, causando dano aos inimigos ao redor com base em 90% da vida regenerada. (Esse Dano é calculado de forma semelhante a reações como Eletricamente Carregado e Supercondutor, mas não é afetado pela Proficiência Elemental, níveis de personagens ou dano bônus de reações.) Apenas se pode criar uma Bolha de Espuma do Mar a cada 3.5s, e esta poderá registrar no máximo 30.000 pontos de vida, incluindo aqueles regenerados acima de 100%. Além disso, apenas uma Bolha de Espuma do Mar pode existir em sua equipe de cada vez. Quando o personagem equipando este conjunto de artefatos está na equipe, mas não em combate, poderá ainda assim ativar este efeito.",
        },
    },
    "artefato_o_exilado": {
        img: "/img/artefatos/Exilado.webp",
        name: "O Exilado",
        pieces: {
            "2": "Recarga de Energia +20%",
            "4": "Ao usar o Supremo, regenera 2 de Energia a todos os personagens da equipe (excluindo o portador) a cada 2s por 6s. Este efeito não pode ser acumulado.",
        },
    },
    "artefato_ultimo_juramento_do_gladiador": {
        img: "/img/artefatos/Gladiador.webp",
        name: "Último Juramento do Gladiador",
        pieces: {
            "2": "ATQ +18%.",
            "4": "Se o portador deste conjunto de artefato usar uma Espada, Espadão ou Lança, aumenta o Dano de seus Ataques Normais em 35%.",
        },
    },
    "artefato_instrutor": {
        img: "/img/artefatos/Instrutor.webp",
        name: "Instrutor",
        pieces: {
            "2": "Proficiência Elemental +80",
            "4": "Após uma Reação Elemental aumenta a Proficiência Elemental de todos os membros da Equipe em 120 por 8s.",
        },
    },
    "artefato_memorias_da_floresta": {
        img: "/img/artefatos/Memorias_da_Floresta.webp",
        name: "Instrutor",
        pieces: {
            "2": "Bônus de Dano Dendro +15%",
            "4": "Depois que as Habilidades Elementais ou Supremos acertam os oponentes, a RES Dendro dos alvos serão reduzidas em 30% por 8s. Esse efeito pode ser desencadeado mesmo se o personagem equipando este conjunto não estiver em campo.",
        },
    },
    "artefato_millelith_firmes": {
        img: "/img/artefatos/Millelith.webp",
        name: "Millelith Firmes",
        pieces: {
            "2": "Aumenta a vida em 20%.",
            "4": "Quando a Habilidade Elemental atinge um oponente, o ATQ de todos os membros da equipe próximos aumenta em 20% e sua Força do Escudo aumenta em 30% por 3s. Esse efeito pode ser ativado uma vez a cada 0,5s. Esse efeito ainda pode ser ativado mesmo quando o personagem que está usando esse conjunto de artefatos não está em campo.",
        },
    },
    "artefato_flor_do_paraiso_perdido": {
        img: "/img/artefatos/Paraiso_Perdido.webp",
        name: "Flor do Paraíso Perdido",
        pieces: {
            "2": "Aumenta a Proficiência Elemental em 80.",
            "4": "Aumenta em 40% o Dano infligido pelas reações de Florescimento, Superflorescimento e Germinação de seu portador. Além disto, após o personagem que está equipado com este conjunto de artefatos desencadear as reações de Florescimento, Superflorescimento e Germinação, o bônus descrito acima é aumentado em 25%. Este efeito dura 10s e pode ser acumulado até 4 vezes, podendo ser desencadeado 1 vez por segundo. Este efeito pode ser desencadeado também quando o seu portador está na equipe, porém fora do campo de batalha.",
        },
    },
    "artefato_profundezas_do_coração": {
        img: "/img/artefatos/Profundezas.webp",
        name: "Profundezas do Coração",
        pieces: {
            "2": "Bônus de Dano Hydro +15%",
            "4": "Após usar uma Habilidade Elemental, aumenta o Dano do Ataque Normal e Carregado em 30% por 15s.",
        },
    },
    "artefato_reminiscencia_nostalgica": {
        img: "/img/artefatos/Reminiscencia_Nostalgica.webp",
        name: "Reminiscência Nostálgica",
        pieces: {
            "2": "ATQ +18%.",
            "4": "Ao lançar sua Habilidade Elemental, se a Energia Elemental do Personagem for maior ou igual a 15, ele perderá 15 pontos de Energia Elemental e nos próximos 10s, seus Ataques Normais, Ataques Carregados, Ataques Imersivos terão um aumento de 50% de Dano. Esse efeito só pode ser desencadeado uma vez dentro desse intervalo de tempo.",
        },
    },
    "artefato_antigo_ritual_real": {
        img: "/img/artefatos/Ritual_Real.webp",
        name: "Antigo Ritual Real",
        pieces: {
            "2": "Dano do Supremo +20%",
            "4": "Usar o Supremo aumenta o ATQ de todos os membros da equipe em 20% por 12s. Este efeito não pode ser acumulado.",
        },
    },
    "artefato_selo_da_insulacao": {
        img: "/img/artefatos/Selo_da_Insulacao.webp",
        name: "Selo da Insulação",
        pieces: {
            "2": "Recarga de Energia +20%",
            "4": "Aumenta o Dano do Supremo em 25% da Recarga de Energia. No máximo é possível obter 75% de aumento de Dano dessa maneira.",
        },
    },
    "artefato_sonho_da_ninfa": {
        img: "/img/artefatos/Sonho_da_Ninfa.webp",
        name: "Sonho da Ninfa",
        pieces: {
            "2": "Bônus de Dano Hydro +15%",
            "4": "Quando um Ataque Normal, Carregado, Imersivo, Habilidade Elemental ou Supremo atingem um inimigo, gerarão um acúmulo do efeito \"Ninfa Espelhada\" por 8s. Quando possuir 1/2/3 acúmulos ou mais do efeito \"Ninfa Espelhada\", aumentará o ATQ em 7%/16%/25, e aumentará o Bônus de Dano Hydro em 4%/9%/15%. Os acúmulos de \"Ninfa Espelhada\" gerados por Ataques Normais, Carregados, Imersivos, Habilidade Elemental ou Supremos existem independentemente.",
        },
    },
    "artefato_sonhos_dourados": {
        img: "/img/artefatos/Sonhos_Dourados.webp",
        name: "Sonhos Dourados",
        pieces: {
            "2": "Proficiência Elemental +80",
            "4": "Dentro de 8s após causar uma Reação Elemental, o personagem equipando este conjunto irá obter aprimoramentos baseados no Tipo Elemental dos outros membros da equipe. O ATQ é aumentado em 14% para cada membro da equipe cujo Tipo Elemental seja o mesmo que o personagem equipando o conjunto. A Proficiência Elemental é aumentada em 50 para cada membro da equipe com Tipos Elementais diferentes. Cada um desses aprimoramentos mencionados anteriormente irá contar para até 3 personagens. Esse efeito pode ser desencadeado uma vez a cada 8s. O personagem que equipar este conjunto ainda pode ativar seu efeito mesmo que não esteja em campo.",
        },
    },
    "artefato_trupe_dourada": {
        img: "/img/artefatos/Trupe Dourada.webp",
        name: "Trupe Dourada",
        pieces: {
            "2": "Aumenta o dano da Habilidade Elemental em 20%.",
            "4": "Aumenta o Dano da Habilidade Elemental em 25%. Além disso, quando o personagem não está no campo de batalha, o Dano da Habilidade Elemental aumenta em mais 25%. Este efeito será removido 2s após o personagem entrar no campo de batalha.",
        },
    },
    "artefato_trupe_itinerante": {
        img: "/img/artefatos/Trupe_Itinerante.webp",
        name: "Trupe Itinerante",
        pieces: {
            "2": "Proficiência Elemental +80",
            "4": "Aumenta o Dano do Ataque Carregado em 35% se o personagem estiver usando Catalisador ou Arco.",
        },
    },
    "artefato_alem_vida_cinabrio": {
        img: "/img/artefatos/Alem_Vida_Cinabrio.png",
        name: "Além Vida: Cinábrio",
        pieces: {
            "2": "ATQ +18%.",
            "4": "Depois do Supremo ser usado, será desencadeado o efeito de \"Luz Nascente\" por 16s: o ATQ será aumentado em 8% e quando a Vida do personagem diminuir, o ATQ aumentará mais 10%. Esse aumento pode ocorrer desta forma no máximo 4 vezes, e pode ser desencadeado 1 vez a cada 0.8s. O efeito de \"Luz Nascente\" desaparece quando o personagem sai do campo de batalha. Quando o personagem lança novamente o Supremo durante o efeito, o efeito original de \"Luz Nascente\" será removido.",
        },
    }
};
Object.freeze(ARTIFACT_DATABASE);

function PopupHtml() {
    return `
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 16px;">
            <div class="display: flex; flex-direction: column;">
                <p id="popup-artifact-name" style="font-weight: bold; font-size: 20px; color: white"></p>
                <p>Conjunto de Artefatos</p>
            </div>
            <img id="popup-artifact-img" class="t5" src="" style="width: 70px; height: 70px; border-radius: 8px"/>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            ${PopupPieces(2)}
            ${PopupPieces(4)}
        </div>
    `;
}

function PopupPieces(count) {
    return `
        <div>
            ${PopupPiecesCount(count)}<p style="display: inline; font-size: 14px; line-height: 1;" id="popup-artifact-effect-${count}"></p>
        </div>
    `;
}

function PopupPiecesCount(count) {
    return `
        <div style="display: inline-block; background-color: white; color: black; padding: 4px 6px; font-weight: bold; border-radius: 4px; margin-right: 8px; font-size: 12px; line-height: 1;">${count}</div>
    `;
}

function update(parent, popupElement) {
    console.log(parent.tagName)
    return new Promise((resolve) => {
        computePosition(parent, popupElement, {
            placement: "top",
            middleware: [flip(), offset(6), shift({ padding: 5 })],
        }).then(({ x, y }) => {
            Object.assign(popupElement.style, {
                width: isMobile() ? '300px' : '500px',
                backgroundColor: "black",
                borderRadius: "16px",
                border: "1px solid white",
                padding: "16px",
            }, {
                top: `${y}px`,
                left: `${x}px`,
            });
            return resolve();
        });
    });
}

async function showTooltip(parent, popupElement, artifactId) {
    document.getElementById("popup-artifact-name").innerText = ARTIFACT_DATABASE[artifactId].name;
    document.getElementById("popup-artifact-img").src = ARTIFACT_DATABASE[artifactId].img;
    document.getElementById("popup-artifact-effect-2").innerText = ARTIFACT_DATABASE[artifactId].pieces["2"];
    document.getElementById("popup-artifact-effect-4").innerText = ARTIFACT_DATABASE[artifactId].pieces["4"];
    popupElement.style.display = 'block';
    // This is a small hack to make sure the popup is positioned correctly
    if (popupElement.style.top === '') await update(parent, popupElement);
    await update(parent, popupElement);
}

function hideTooltip(parent, popupElement) {
    popupElement.style.display = 'none';
}

function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
}

(function () {
    const popupElement = document.createElement("div");
    popupElement.id = "popup";
    popupElement.innerHTML = PopupHtml();
    popupElement.style.display = 'none';
    document.body.appendChild(popupElement);

    const styles = document.createElement("style");
    styles.type = "text/css";
    styles.innerHTML = `
        #popup {
            position: absolute;
            width: max-content;
            top: 0;
            width: 0;
        }
    `;
    document.getElementsByTagName('head')[0].appendChild(styles);

    for (const artifactId of Object.keys(ARTIFACT_DATABASE)) {
        document.querySelectorAll(`.${artifactId}`).forEach(function (element) {
            [
                ['mouseenter', showTooltip],
                ['mouseleave', hideTooltip],
                ['focus', showTooltip],
                ['blur', hideTooltip],
            ].forEach(([event, listener]) => {
                element.addEventListener(event, () => listener(element, popupElement, artifactId));
            });
        });
    }
})();
