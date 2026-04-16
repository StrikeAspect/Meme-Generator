<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/StrikeAspect/Creative-portfolio">
    <img src="favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">RF-Creator | Digital Portfolio</h3>

  <p align="center">
    <br />
    <br />
    <a href="https://rf-creator.me"><strong>Explore the portfolio »</strong></a>
    <br />
    <br />
    <a href="https://rf-creator.me/links">View Links</a>
    ·
    <a href="https://github.com/StrikeAspect/Creative-portfolio/issues">Report Bug</a>
    ·
    <a href="https://cal.com/rf-creator">Request Collaboration</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#core-competencies">Core Competencies</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#repository-structure">Repository Structure</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage-&--workflows">Usage & Workflows</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This repository houses my professional design portfolio and dynamic link hub. Built from the ground up to showcase my work, the platform seamlessly integrates advanced graphic techniques with my professional photography and digital branding efforts.

### Core Competencies
* **Professional Photography:** Specialized in multimedia content creation, high-quality landscape/portrait shots, and meticulous post-production mapping.
* **Digital Branding:** Developing strong, cohesive visual identities across websites and social platforms to help brands look as good as they function.
* **Creative Strategy:** Utilizing a deep background in SEO and marketing to ensure maximum visual impact, fast loading times, and engaging user flows.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

The project focuses on performance and pure aesthetic control, utilizing lean vanilla technologies alongside modern optimization tools.

* [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
* [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- REPOSITORY STRUCTURE -->
## Repository Structure

The project has been scaled with a DevOps mindset to keep logic separate from static assets without breaking deployments or routing.

```text
/
├── assets/             # Compressed, optimized imagery (WebP, SVG)
├── css/                
│   ├── main.css        # Core stylesheet for the main portfolio
│   └── links.css       # Isolated stylesheet for the '/links' social hub
├── js/
│   └── main.js         # Navigation, animations, and modals
├── links/
│   └── index.html      # Independent social link tree route (rf-creator.me/links)
├── index.html          # Main application entry point
├── package.json        # Node dependencies (chiefly for the optimization agent)
└── *config/docs        # Various bots, SEO specs (sitemap, robots.txt, etc.)
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps. The system requires no complex build tools for the frontend visuals.

### Prerequisites

You need `npm` installed if you intend to run the backend optimization agent scripts.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/StrikeAspect/Creative-portfolio.git
   ```
2. Navigate to the local directory:
   ```sh
   cd Creative-portfolio
   ```
3. Install NPM packages (for the optimization agent):
   ```sh
   npm install
   ```
4. Serve locally using standard dev tools (e.g. `VS Code Live Server`):
   ```sh
   npx serve .
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage & Workflows

Below are some common operational notes regarding maintaining this repository:

* **Running Locals:** To preview HTML/CSS variations, use a local development server extension (like Live Server in VSCode) to watch for file changes instantly without hard-refreshing.
* **Adding Portfolio Items:** Drop `.webp` images into the `/assets` directory. In `index.html`, copy an existing `<div class="masonry-item reveal">` layout.
* **Netlify Forms:** Any newly added contact form inputs must be strictly bound with a `name` attribute so that Netlify records it silently.

_For deeper contextual notes, please refer to the private `/retrospective` directory (now `.gitignored` to preserve repo clarity)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Ramson Fregene - [@rf_creator](https://rf-creator.me/links)

Project Link: [https://github.com/StrikeAspect/Creative-portfolio](https://github.com/StrikeAspect/Creative-portfolio)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Font Awesome](https://fontawesome.com)
* [Cal.com Integration](https://cal.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
