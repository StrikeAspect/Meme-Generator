<a name="readme-top"></a>

<div align="center">
  <img src="assets/mgrf.png" alt="Meme Generator RF" width="80" height="80">
  <h1 align="center">Meme Generator RF</h1>
  <p align="center">
    A playful meme creation tool made with vanilla web tech. Grab a template, drop in text, export your viral-ready meme.
  </p>
  <p align="center">
    <a href="#about-the-project">About</a> ·
    <a href="#built-with">Built With</a> ·
    <a href="#project-structure">Structure</a> ·
    <a href="#usage">Usage</a>
  </p>
  <p align="center">
    <a href="https://strikeaspect.github.io/Meme-Generator/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Live%20Preview-202B67?style=for-the-badge&logo=github&logoColor=white" alt="Live Preview">
    </a>
    <a href="https://ko-fi.com/rf_creator" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Ko--fi-5CE1E6?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Leave a coffee">
    </a>
  </p>
</div>

## Built With

* [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## About The Project

This is my lightweight meme generator experience, built as a fun frontend project that turns meme templates into shareable images.

I designed it to be simple and fast:

* fetch meme templates from a public API
* render the gallery instantly in `index.html`
* let users choose a template and edit it in `crea.html`
* paint text onto a canvas and export the final meme

If the API is unavailable, the app gracefully falls back to local placeholder templates so the experience still works.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

```text
/
├── assets/             # placeholder image assets and visual resources
├── css/
│   ├── main.css        # shared app layout and theme styles
│   └── crea.css        # editor-specific controls and canvas styling
├── scripts/
│   ├── api.js          # meme API loader and fallback handler
│   ├── main.js         # gallery rendering + lazy loading logic
│   ├── canvas.js       # meme canvas editor, text rendering, download export, and project persistence
│   └── ui.js           # template-based UI rendering components
├── crea.html           # meme editor page
├── index.html          # template gallery landing page
├── tests/              # unit tests for core logic and persistence
└── README.md           # this project overview
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

1. Open `index.html` in your browser.
2. Pick a meme template from the gallery.
3. Add top and bottom text in the editor.
4. Adjust the text size slider to fit your message.
5. Hit **"Download Meme"** to save your creation as an image.
6. Use **"Save Project"** to export your work as a JSON file.
7. Use **"Import Project"** to load a previously saved JSON file and resume editing.

### Features

* **Template Selection**: Choose from hundreds of meme templates.
* **Text Editing**: Add top and bottom text with free dragging on the canvas.
* **Persistence**:
    * **Save Project**: Export current state (text, positions, image) as a JSON file.
    * **Import Project**: Load a JSON file to restore the meme state perfectly.
* **UI Templating**: Decoupled DOM logic using `scripts/ui.js` for cleaner rendering.

### Technical Notes

* `scripts/api.js` loads templates from `https://meme-api.com/gimme/15`
* `scripts/main.js` builds the gallery and lazy-loads each image using `ui.js`
* `scripts/canvas.js` handles the canvas rendering and JSON export/import
* `scripts/ui.js` contains the HTML templates for gallery items and controls
* The app works as a static frontend and is best served locally or via a simple static server

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

[@rf_creator](https://github.com/StrikeAspect)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
