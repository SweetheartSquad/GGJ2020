import "normalize.css";
import "./index.css";

import { problems, solutions, rules } from "./cards";

function makeCard(cardDef) {
    const card = document.createElement("div");
    card.className = `card ${cardDef.type}`;
    card.style.backgroundImage = `url("./images/${cardDef.title}.png")`;

    if (cardDef.title) {
        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = cardDef.title;
        title.dataset.title = cardDef.title;
        card.appendChild(title);
    }

    if (cardDef.description) {
        const description = document.createElement("div");
        description.textContent = cardDef.description;
        description.className = "card-description";
        card.appendChild(description);
    }

    return card;
}

function makeRulesCards(rules){

    let chunckedRules = [];
    let currentChunck = [];

    for(let i=0; i < rules.length; i++){
        currentChunck.push(rules[i]);
        if(currentChunck.length == 4 || i == rules.length - 1){
            chunckedRules.push(currentChunck);
            currentChunck = [];
        }
    }

    let cards = [];

    let ruleIndex = 1;
    let chunckIndex = 1;
    for(let rulesChunk of chunckedRules){
        const card = document.createElement("div");
        card.className = `card rules description`;

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = `Rules ${chunckIndex}/${chunckedRules.length}`;
        title.dataset.title = `Rules ${chunckIndex}/${chunckedRules.length}`;
        card.appendChild(title);

        const details = document.createElement("div");
        for(let rule of rulesChunk){
            const ruleElem = document.createElement("span");
            ruleElem.className = "rule";
            ruleElem.innerHTML = `<b>${ruleIndex}.</b> ${rule}`;
            details.appendChild(ruleElem);
            ruleIndex += 1;
        }
        card.appendChild(details);
        cards.push(card);
        chunckIndex += 1;
    }
    return cards;
}

function makePage() {
    const page = document.createElement("div");
    page.className = "page";
    return page;
}

function printPage() {
    const cards = [
        ...makeRulesCards(rules),
        ...solutions.map(makeCard),
        ...problems
            .map(card => ({ ...card, type: "problem", description: "" }))
            .map(makeCard)
    ];
    const cardsPerPage = 9;
    const pages = new Array(Math.ceil(cards.length / 9)).fill(0).map((_, idx) => {
        const begin = idx * cardsPerPage;
        return cards.slice(begin, begin + cardsPerPage);
    });

    pages.forEach(page => {
        const pageEl = makePage();
        page.forEach(card => pageEl.appendChild(card));
        document.body.appendChild(pageEl);
    });
}

function handPage() {
    let solutionCards = [...solutions.map(makeCard)];
    for (let i = 0; i < 5; i++) {
        let idx = Math.floor(Math.random() * solutionCards.length);
        var card = solutionCards[idx];
        card.style.width = "500px";
        card.style.height = "700px";
        document.body.appendChild(card, idx);
        solutionCards.splice(idx, 1);
    }
}

function landingPage() {
    var printButton = document.createElement("button");
    printButton.onclick = () => {
        window.location.hash = "#print";
        window.location.reload();
    };
    printButton.textContent = "Print";
    document.body.appendChild(printButton);

    var handButton = document.createElement("button");
    handButton.onclick = () => {
        window.location.hash = "#hand";
        window.location.reload();
    };
    handButton.textContent = "Hand";
    document.body.appendChild(handButton);
}

if (window.location.hash == "#print") {
    printPage();
} else if (window.location.hash == "#hand") {
    handPage();
} else {
    landingPage();
}
