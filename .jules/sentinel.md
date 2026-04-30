## 2024-05-24 - [DOM XSS via Unescaped Template Strings]
**Vulnerability:** DOM-based Cross-Site Scripting (XSS) where external data and local storage data were injected directly into HTML strings via template literals without sanitization.
**Learning:** The application lacks a centralized templating engine or sanitization utility, making it prone to XSS when rendering dynamic content (like fetched meme data or recently used memes).
**Prevention:** Implement and use an `escapeHTML` helper function consistently before interpolating any dynamic or untrusted variables into HTML strings. Ensure proper separation of contexts, using `encodeURIComponent` strictly for URL parameters and `escapeHTML` for HTML content and attributes.
