import 'normalize.css';
import './index.css';

import { problems, solutions } from './cards';

function makeCard(cardDef) {
	const card = document.createElement('div');
	card.className = 'card';

	const title = document.createElement('div');
	title.className = "card-title";
	title.textContent = cardDef.title;
	card.appendChild(title);

	const img = document.createElement('div');
	img.className = "card-image";
	img.style.backgroundImage = "url(https://www.placecage.com/500/500)";
	card.appendChild(img);

	if(cardDef.description){
		const description = document.createElement('div');
		description.textContent = cardDef.description;
		description.className = "card-description";
		card.appendChild(description);
	}

	return card;
}

function makePage() {
	const page = document.createElement('div');
	page.className = 'page';
	return page;
}

const cards = [...problems.map(makeCard), ...solutions.map(makeCard)];

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
