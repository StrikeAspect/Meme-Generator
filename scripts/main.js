import { memeApi } from './api.js';

(async () => {

	await memeApi.init();

	const gallery = document.querySelector('#gallery');
	const memes = memeApi.memeList;

	if (memes.length > 0) {

		let html = '';

		const escapeHTML = (str) => {
			return String(str)
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;');
		};

		memes.forEach(meme => {
			const { id, name, title, url } = meme;
			const displayName = escapeHTML(name || title || 'Meme');

			const rawImageName = memeApi.getMemeNameFromUrl(url);
			const imageName = escapeHTML(rawImageName);

			const encodedUrl = encodeURIComponent(url);
			const safeUrl = escapeHTML(url);

			const galleryItem = `
			<li class="gallery-item skeleton" data-src="${safeUrl}" data-imageName="${imageName}">
				<div>
					<p>${displayName}</p>
					<a href="crea.html?imageUrl=${encodedUrl}&imageName=${encodeURIComponent(rawImageName)}">Usa template</a>
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
