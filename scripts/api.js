export class ImgFlipApi {
	_endpoint = "https://api.imgflip.com/get_memes";
	_memes = [];

	constructor() { }

	async init() {
		await this.loadMemes();
	}

	async loadMemes() {
		try {
			const response = await fetch(this._endpoint);
			const memes = await response.json();

			this._memes = memes;
		} catch (error) {
			console.error(error);
		}
	}

	get memeList() {
		if (this._memes.success === true) {
			return this._memes.data.memes;
		} else {
			return [];
		}
	}

	getMemeNameFromUrl(url) {
		const urlParts = url.split("/");
		return urlParts[urlParts.length - 1];
	}
}
