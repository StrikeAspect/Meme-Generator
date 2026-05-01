export class MemeApi {
	_endpoint = "https://meme-api.com/gimme/15";
	_memes = [];
	_fallbackMemes = [
		{ id: 'local-1', name: 'Meme Placeholder 1', url: 'assets/placeholder.svg' },
		{ id: 'local-2', name: 'Meme Placeholder 2', url: 'assets/placeholder.svg' },
		{ id: 'local-3', name: 'Meme Placeholder 3', url: 'assets/placeholder.svg' },
		{ id: 'local-4', name: 'Meme Placeholder 4', url: 'assets/placeholder.svg' },
		{ id: 'local-5', name: 'Meme Placeholder 5', url: 'assets/placeholder.svg' },
	];

	async init() {
		await this.loadMemes();
	}

	async loadMemes() {
		try {
			const response = await fetch(this._endpoint);

			if (!response.ok) {
				throw new Error(`API request failed: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();

			if (Array.isArray(data?.memes)) {
				this._memes = data.memes;
			} else if (data?.url) {
				this._memes = [data];
			} else {
				throw new Error('Meme API returned unexpected data');
			}
		} catch (error) {
			console.error('Meme API failed:', error);
			this._memes = this._fallbackMemes;
		}
	}

	get memeList() {
		return Array.isArray(this._memes) ? this._memes : [];
	}

	getMemeNameFromUrl(url) {
		const urlParts = url.split("/");
		return urlParts[urlParts.length - 1] || 'meme';
	}
}

export const memeApi = new MemeApi();
