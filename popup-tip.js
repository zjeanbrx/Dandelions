const ARTIFACT_DATABASE = {
    "marechaussee-hunter": {
        img: "/img/artefatos/Cacador_das_Sombras.webp",
        name: "Caçador das Sombras",
        pieces: {
            "2": "+15% de dano em Ataques Normais e Carregados",
            "4": "Quando a Vida aumenta ou diminui, o Dano Crítico será aumentado em 12% por 5 segundos. Máximo 3 acúmulos."
        },
    },
};
Object.freeze(ARTIFACT_DATABASE);

class Popup {
    constructor() {
        this.element = document.createElement("div");
        this.isHidden = true;
        this.setupMouseInteraction();
        document.body.appendChild(this.element);
    }

    setupMouseInteraction() {
        const popup = this;
        document.body.addEventListener("click", (event) => {
            if (this.isHidden) return;
            if (event.target === popup) return;
            // this.hide();
        });
    }

    /**
     * @param {HTMLElement} parentElement 
     */
    show(parentElement) {
        this.isHidden = false;
        this.element.style.display = 'block';
        this.element.style.position = 'absolute';
        this.element.style.zIndex = 9;

        const { top, left } = parentElement.getBoundingClientRect();

        const height = this.element.offsetHeight;
        if (top + height > window.innerHeight) {
            this.element.style["top"] = `${Math.floor(top - height)}px`;
        } else {
            this.element.style["top"] = `${Math.floor(top)}px`;
        }

        const width = this.element.offsetWidth;
        if (left + width > window.innerWidth) {
            this.element.style["left"] = `${Math.floor(left - width)}px`;
        } else {
            this.element.style["left"] = `${Math.floor(left)}px`;
        }
    }

    hide() {
        this.isHidden = true;
        this.element.style.display = 'none';
    }

    /**
     * @param {string} html 
     */
    setInnerHtml(html) {
        this.element.innerHTML = html;
    }

    /**
     * @param {Record<string, ElementCSSInlineStyle>} styles
     */
    setStyles(styles) {
        Object.assign(this.element.style, styles);
    }
}

class ArtifactPopup extends Popup {
    constructor() {
        super();
        this.setupStyles();
        this.setupListeners();
    }

    setupStyles() {
        this.setStyles({
            width: '400px',
            backgroundColor: "black",
            borderRadius: "16px",
            border: "1px solid white",
            padding: "16px",
        });
    }

    setupListeners() {
        const popup = this;
        document.querySelectorAll(".marechaussee-hunter").forEach(function (element) {
            element.addEventListener("click", function () {
                popup.setInnerHtml(PopupHtml());
                popup.show(element);
            });
        });
    }
}

function PopupHtml(artifactName, artifactImg, artifact2Pieces, artifact4Pieces) {
    return `
        <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 16px;">
            <div class="display: flex; flex-direction: column;">
                <p style="font-weight: bold; font-size: 20px; color: white">${ARTIFACT_DATABASE["marechaussee-hunter"].name}</p>
                <p>Conjunto de Artefatos</p>
            </div>
            <img class="t5" src="${ARTIFACT_DATABASE["marechaussee-hunter"].img}" style="width: 70px; height: 70px; border-radius: 8px"/>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
            ${PopupPieces(2, ARTIFACT_DATABASE["marechaussee-hunter"].pieces["2"])}
            ${PopupPieces(4, ARTIFACT_DATABASE["marechaussee-hunter"].pieces["4"])}
        </div>
    `;
}

function PopupPieces(count, effect) {
    return `
        <div>
            ${PopupPiecesCount(count)}${effect}
        </div>
    `;
}

function PopupPiecesCount(count) {
    return `
        <div style="display: inline-block; background-color: white; color: black; padding: 4px 8px; font-weight: bold; border-radius: 4px; margin-right: 8px;">${count}</div>
    `;
}

function update() {
    computePosition(button, tooltip, {
        // ... options ...
    }).then(({x, y, placement, middlewareData}) => {
        // ... positioning logic ...
    });
}

function showTooltip() {
    tooltip.style.display = 'block';
    update();
}

function hideTooltip() {
    tooltip.style.display = '';
}

(function () {
    const element = document.createElement("div");
    document.appendChild(element);
    document.style = {
        position: "absolute",
        width: "max-content",
        top: "0",
        left: "0",
    };

    [
        ['mouseenter', showTooltip],
        ['mouseleave', hideTooltip],
        ['focus', showTooltip],
        ['blur', hideTooltip],
    ].forEach(([event, listener]) => {
        document.querySelectorAll(".marechaussee-hunter").forEach(function (element) {
            element.addEventListener(event, listener);
        });
    });
})();
