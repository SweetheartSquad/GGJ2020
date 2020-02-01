import 'normalize.css';
import './index.css';

function makeCard() {
	const card = document.createElement('div');
	card.className = 'card';
	card.textContent = 'fffff';
	return card;
}

const page = document.createElement('div');
page.className = 'page';

new Array(9).fill(0).forEach(() => {
	page.appendChild(makeCard());
});
document.body.appendChild(page);
