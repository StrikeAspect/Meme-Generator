import { memeApi } from './api.js';
import { renderGalleryItem, handleGalleryIntersection } from './ui.js';

(async () => {

	await memeApi.init();

	const gallery = document.querySelector('#gallery');
	const memes = memeApi.memeList;

	if (memes.length > 0) {

		let html = '';

		memes.forEach(meme => {
			html += renderGalleryItem(meme, memeApi.getMemeNameFromUrl);
		});

		gallery.innerHTML = html;

		const lazyLoadItems = document.querySelectorAll('.gallery-item.skeleton');
		const observer = new IntersectionObserver(handleGalleryIntersection);

		lazyLoadItems.forEach(item => observer.observe(item));

	} else {
		gallery.innerHTML = '<li class="gallery-empty">Could not load memes. Please try again later.</li>';
	}

})();
