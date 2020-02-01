import 'normalize.css';
import './index.css';

import { problems, solutions } from './cards';

function makeCard(cardDef, idx) {
	const card = document.createElement('div');
	card.className = 'card';
	card.style.backgroundImage = `url(https://www.placecage.com/${idx+250}/${idx+350})`;

	const title = document.createElement('div');
	title.className = "card-title";
	title.textContent = cardDef.title;
	card.appendChild(title);


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