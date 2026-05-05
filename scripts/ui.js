/**
 * UI Templates for Meme Generator
 */

/**
 * Escapes HTML to prevent XSS
 * @param {string} str 
 * @returns {string}
 */
export function escapeHTML(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Renders a single gallery item template
 * @param {Object} meme 
 * @param {Function} getMemeNameFromUrl 
 * @returns {string}
 */
export function renderGalleryItem(meme, getMemeNameFromUrl) {
    const { id, name, title, url } = meme;
    const displayName = escapeHTML(name || title || 'Meme');
    const rawImageName = getMemeNameFromUrl(url);
    const imageName = escapeHTML(rawImageName);
    const encodedUrl = encodeURIComponent(url);
    const safeUrl = escapeHTML(url);

    return `
        <li class="gallery-item skeleton" data-src="${safeUrl}" data-imageName="${imageName}">
            <div>
                <p>${displayName}</p>
                <a href="crea.html?imageUrl=${encodedUrl}&imageName=${encodeURIComponent(rawImageName)}">Use template</a>
            </div>
        </li>
    `;
}

/**
 * Renders a single recent meme item template
 * @param {string} memeDataUrl 
 * @param {number} index 
 * @returns {string}
 */
export function renderRecentMeme(memeDataUrl, index) {
    const safeMeme = escapeHTML(memeDataUrl);
    return `
        <li class="gallery-item">
            <img src="${safeMeme}" alt="Recent meme number ${index + 1}" />
            <a href="${safeMeme}" download="recent-meme-${index + 1}.png">Download</a>
        </li>
    `;
}

/**
 * Renders the editor controls template
 * @returns {string}
 */
export function renderEditorControls() {
    return `
        <div>
            <div class="control-group">
                <label for="text-top">Top text</label>
                <textarea name="text-top" id="text-top" class="text-top" placeholder="Enter top text"></textarea>
            </div>
            <div class="control-group">
                <label for="text-bottom">Bottom text</label>
                <textarea name="text-bottom" id="text-bottom" class="text-bottom" placeholder="Enter bottom text"></textarea>
            </div>
            <div class="control-group">
                <label for="text-size">Text size</label>
                <input type="range" name="text-size" id="text-size" min="0" max="100" value="50" class="text-size">
            </div>
            <div class="button-group" style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn--small save-button">Download Meme</button>
                <button class="btn btn--small save-project-button">Save Project</button>
                <button class="btn btn--small import-project-button">Import Project</button>
                <input type="file" id="import-project-input" style="display: none;" accept=".json">
            </div>
        </div>
    `;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { escapeHTML, renderGalleryItem, renderRecentMeme, renderEditorControls };
}
