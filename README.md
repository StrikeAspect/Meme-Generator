# Meme Generator RF

A simple browser-based meme generator built with HTML, CSS, and JavaScript.

## Purpose

This project provides a lightweight meme creation experience:

- Loads meme templates from an external meme API
- Displays a gallery of meme images on `index.html`
- Lets users choose a template and edit it on `crea.html`
- Supports adding top and bottom text, adjusting text size, and downloading the finished meme

## Files

- `index.html` — landing page and meme template gallery
- `crea.html` — meme editor page with canvas and text controls
- `css/main.css` — shared styles for the app
- `css/crea.css` — editor-specific styles
- `scripts/api.js` — fetches meme templates and provides fallback data
- `scripts/main.js` — builds the gallery and lazy-loads meme images
- `scripts/canvas.js` — handles meme rendering and export (editor functionality)
- `assets/` — local assets and placeholders

## How to use

1. Open `index.html` in a browser.
2. Select a meme template from the gallery.
3. Add top and bottom text on the editor page.
4. Adjust the text size.
5. Download the finished meme.

## Notes

- The gallery fetches memes from `https://meme-api.com/gimme/15`.
- If the API fails, fallback placeholder templates are used instead.
- The app is written for local static hosting and works best served from a web server or file system.
