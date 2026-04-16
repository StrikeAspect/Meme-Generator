import { ImgFlipApi } from './api.js';

(async () => {

	const imgFlipApi = new ImgFlipApi();
	await imgFlipApi.init();

	const gallery = document.querySelector('#gallery');

	if (imgFlipApi.memeList.length > 0) {

		let html = '';

		imgFlipApi.memeList.forEach(meme => {
			const {id, name, url} = meme;
			const imageName = imgFlipApi.getMemeNameFromUrl(url);

			const galleryItem = `
			<li class="gallery-item skeleton" data-src="${url}" data-imageName="${imageName}">
				<div>
					<p>${name}</p>
					<a href="crea.html?imageName=${imageName}">Usa template</a>
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
					observer.unobserve(item);
				}
			})
		})

		lazyLoadItems.forEach(item => observer.observe(item));


	}

})();
