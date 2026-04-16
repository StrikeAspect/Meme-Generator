import { memeApi } from './api.js';

(async () => {

	await memeApi.init();

	const gallery = document.querySelector('#gallery');
	const memes = memeApi.memeList;

	if (memes.length > 0) {

		let html = '';

		memes.forEach(meme => {
			const { id, name, title, url } = meme;
			const displayName = name || title || 'Meme';
			const imageName = memeApi.getMemeNameFromUrl(url);
			const encodedUrl = encodeURIComponent(url);

			const galleryItem = `
			<li class="gallery-item skeleton" data-src="${url}" data-imageName="${imageName}">
				<div>
					<p>${displayName}</p>
					<a href="crea.html?imageUrl=${encodedUrl}&imageName=${encodeURIComponent(imageName)}">Usa template</a>
				</div>
			</li>
			`;

			html += galleryItem;
		});

		gallery.innerHTML = html;

		const lazyLoadItems = document.querySelectorAll('.gallery-item.skeleton');
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const item = entry.target;

					const img = document.createElement('img');
					img.src = item.dataset.src;
					img.alt = item.querySelector('p').textContent;
					img.classList.add('fade-in');
					img.onload = () => {
						item.classList.remove('skeleton');
						item.insertBefore(img, item.firstChild);
					};
					img.onerror = () => {
						if (img.src !== 'assets/placeholder.svg') {
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
		gallery.innerHTML = '<li class="gallery-empty">Non è stato possibile caricare i meme. Riprova più tardi.</li>';
	}

})();
