import 'normalize.css';
import './index.css';

import { problems, solutions } from './cards';

function makeCard(cardDef, idx) {
	const card = document.createElement('div');
	card.className = 'card';
	card.style.backgroundImage = `url("${cardDef.img ? `./images/${cardDef.img}` : `https://www.placecage.com/${idx+250}/${idx+350}")`}`;

	const title = document.createElement('div');
	title.className = "card-title";
	title.textContent = cardDef.title;
	title.dataset.title = cardDef.title;
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

var problemCards = [...solutions.map(makeCard)]; 
const cards = [...problemCards, ...problems.map(makeCard)];

const cardsPerPage = 9;
const pages = new Array(Math.ceil(cards.length / 9)).fill(0).map((_, idx) => {
	const begin = idx * cardsPerPage;
	return cards.slice(begin, begin + cardsPerPage);
});



console.log(window.location.hash);
if(window.location.hash == "#print"){
	pages.forEach(page => {
		const pageEl = makePage();
		page.forEach(card => pageEl.appendChild(card));
		document.body.appendChild(pageEl);
	});
}else if(window.location.hash == "#hand"){
	
	for(let i=0; i < 5; i++){
		let idx = Math.floor(Math.random() * problemCards.length); 
		var card = problemCards[idx];
		card.style.width = "500px";
		card.style.height = "700px";
		document.body.appendChild(card, idx);
		problemCards = problemCards.splice(idx);
	}
}else{
	var printButton = document.createElement("button");
	printButton.onclick = () =>{
		window.location.hash = "#print";
		window.location.reload();
	}
	printButton.textContent = "Print";
	document.body.appendChild(printButton);

	var handButton = document.createElement("a");
	printButton.onclick = () =>{
		window.location.hash = "#hand";
		window.location.reload();
	}
	handButton.textContent = "Hand";
	document.body.appendChild(handButton);
}
