import { memeApi } from './api.js';
import { renderGalleryItem } from './ui.js';

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
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const item = entry.target;

					const img = document.createElement('img');
					let src = item.dataset.src;
					
					// Upgrade to https if necessary
					if (src.startsWith('http://')) {
						src = src.replace('http://', 'https://');
					}
					
					img.referrerPolicy = "no-referrer";
					img.src = src;
					img.alt = item.querySelector('p').textContent;
					img.classList.add('fade-in');
					img.onload = () => {
						item.classList.remove('skeleton');
						item.insertBefore(img, item.firstChild);
					};
					img.onerror = () => {
						console.error("Meme Generator: Failed to load gallery image:", src);
						if (!img.src.includes('assets/placeholder.svg')) {
							img.src = 'assets/placeholder.svg';
						}
						item.classList.remove('skeleton');
						item.insertBefore(img, item.firstChild);
					};
					observer.unobserve(item);
				}
			})
		})

		lazyLoadItems.forEach(item => observer.observe(item));

	} else {
		gallery.innerHTML = '<li class="gallery-empty">Could not load memes. Please try again later.</li>';
	}

})();
