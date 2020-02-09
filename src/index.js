import "normalize.css";
import "./index.css";

import packs from "./cards";

function toChunks(arr, chunkSize) {
    return new Array(Math.ceil(arr.length / chunkSize)).fill(0).map((_, idx) => {
        const begin = idx * chunkSize;
        return arr.slice(begin, begin + chunkSize);
    });
}

function makeCard({
    type = "",
    title = "",
    description = "",
}) {
    const card = document.createElement("div");
    card.className = `card ${type}`;

    if (type === "solution") {
        card.style.backgroundImage = `url("./images/${title}.png")`;
    }

    if (title) {
        const titleEl = document.createElement("div");
        titleEl.className = "card-title";
        titleEl.textContent = title;
        titleEl.dataset.title = title;
        card.appendChild(titleEl);
    }

    if (description) {
        const descriptionEl = document.createElement("div");
        descriptionEl.textContent = description;
        descriptionEl.className = "card-description";
        card.appendChild(descriptionEl);
    }

    return card;
}

function makeRulesCards(rules) {
    const rulesPerCard = 4;
    const chunks = toChunks(rules, rulesPerCard);

    return chunks.map((chunk, pageIdx) => makeCard({
        title: `Rules ${pageIdx + 1}/${chunks.length}`,
        description: chunk.map((rule, ruleIdx) => `${pageIdx*rulesPerCard + ruleIdx + 1}. ${rule}`).join("\n\n"),
        type: "rules",
    }));
}

function makeBgPage(type) {
    const page = makePage();
    page.classList.add('bg');
    const textEl = document.createElement('div');
    textEl.textContent = `${type}\xa0\xa0`.repeat(500);
    page.appendChild(textEl);
    return page;
}

function makePage() {
    const page = document.createElement("div");
    page.className = "page";
    return page;
}

function makeCards() {
    const {
        rules = [],
        solutions = [],
        problems = [],
    } = packs[PACK];
    return {
        rules: makeRulesCards(rules),
        solutions: solutions.map(card => makeCard({
            ...card,
            type: `${PACK} solution`
        })),
        problems: problems.map(card => makeCard({
            ...card,
            type: `${PACK} problem`,
            description: ""
        })),
    };
}

function makePrintableDocument() {
    const cardsPerPage = 9;
    const cards = [];

    const {
        rules: ruleCards = [],
        solutions: solutionCards = [],
        problems: problemCards = [],
    } = makeCards();

    function fillPage() {
        const toFill = cards.length % cardsPerPage;
        if (toFill > 0) {
            cards.push(...new Array(cardsPerPage - toFill).fill(0).map(() => makeCard({})));
        }
    }
    cards.push(...ruleCards);
    fillPage();
    cards.push(...solutionCards);
    fillPage();
    cards.push(...problemCards);
    fillPage();
    const pages = toChunks(cards, cardsPerPage);

    pages.forEach(page => {
        const pageEl = makePage();
        page.forEach(card => pageEl.appendChild(card));
        document.body.appendChild(pageEl);
        document.body.appendChild(makeBgPage(page[0].classList[page[0].classList.length - 1]));
    });
}

makePrintableDocument();
