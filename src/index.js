import "normalize.css";
import "./index.css";

import {
    problems,
    solutions,
    rules
} from "./cards";

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

function makePage() {
    const page = document.createElement("div");
    page.className = "page";
    return page;
}

function printPage() {
    const cards = [
        ...makeRulesCards(rules),
        ...solutions.map(card => makeCard({
            ...card,
            type: "solution"
        })),
        ...problems.map(card => makeCard({
            ...card,
            type: "problem",
            description: ""
        }))
    ];
    const cardsPerPage = 9;
    const pages = toChunks(cards, cardsPerPage);

    // fill last page with blank cards
    pages[pages.length - 1].push(...new Array(cardsPerPage - pages[pages.length - 1].length).fill(0).map(() => makeCard({})));

    pages.forEach(page => {
        const pageEl = makePage();
        page.forEach(card => pageEl.appendChild(card));
        document.body.appendChild(pageEl);
    });
}

printPage();
