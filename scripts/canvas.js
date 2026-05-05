import { renderRecentMeme, renderEditorControls } from './ui.js';

class MemeEditor {
  constructor(canvasSelector, imageUrl) {
    this.canvas = document.querySelector(canvasSelector);
    this.ctx = this.canvas.getContext("2d");

    this.controlsContainer = document.querySelector(".controls");
    if (this.controlsContainer) {
      this.controlsContainer.innerHTML = renderEditorControls();
    }

    this.saveButton = document.querySelector(".save-button");
    this.saveProjectButton = document.querySelector(".save-project-button");
    this.importProjectButton = document.querySelector(".import-project-button");
    this.importProjectInput = document.querySelector("#import-project-input");
    this.recentMeme = document.querySelector(".recent-memes");

    this.imageUrl = imageUrl || "assets/placeholder.svg";
    
    // Ensure https for external images to avoid Mixed Content on GitHub Pages
    if (this.imageUrl.startsWith("http://")) {
      this.imageUrl = this.imageUrl.replace("http://", "https://");
    }

    this.image = new Image();
    this.image.referrerPolicy = "no-referrer";
    
    // Attempt with anonymous crossOrigin to allow downloading
    // But provide a fallback if the server doesn't support CORS
    if (this.imageUrl.startsWith('http') || this.imageUrl.startsWith('//')) {
      this.image.crossOrigin = "anonymous";
    }

    this.image.onload = this.setupCanvasAndRedraw.bind(this);
    
    this.image.onerror = () => {
      // Fallback 1: If CORS failed, try loading without it
      if (this.image.crossOrigin === "anonymous") {
        console.warn("Meme Generator: CORS blocked the image. Retrying without CORS (Download might not work)...");
        this.image.crossOrigin = null;
        // Add a small delay and a cache-buster to force a fresh non-CORS request
        const cacheBuster = `t=${Date.now()}`;
        const separator = this.imageUrl.includes('?') ? '&' : '?';
        this.image.src = `${this.imageUrl}${separator}${cacheBuster}`;
        return;
      }

      // Fallback 2: If everything fails, show the local placeholder
      console.error("Meme Generator: Permanent failure loading image:", this.imageUrl);
      if (!this.image.src.includes("assets/placeholder.svg")) {
        console.log("Meme Generator: Showing placeholder asset instead");
        this.image.src = "assets/placeholder.svg";
      }
    };

    // Initial load attempt
    this.image.src = this.imageUrl;

    this.textState = {
      top: { text: "", x: 0, y: 75 },
      bottom: { text: "", x: 0, y: 0 },
    };
    this.currentTextSize = 50;

    this.isDragging = false;
    this.draggedText = null;
    this.dragOffset = { x: 0, y: 0 };

    this.attachEventsListeners();
    this.showRecentMemes();
  }

  setupCanvasAndRedraw() {
    const maxWidth = 800;
    let width = this.image.width;
    let height = this.image.height;

    if (width > maxWidth) {
      const ratio = maxWidth / width;
      width = maxWidth;
      height = height * ratio;
    }

    this.canvas.width = width;
    this.canvas.height = height;

    // Reset default positions if they are 0 (e.g. first load)
    if (this.textState.bottom.x === 0 && this.textState.bottom.y === 0) {
      this.textState.bottom.y = this.canvas.height - 50;
      this.textState.bottom.x = this.canvas.width / 2;
    }

    if (this.textState.top.x === 0) {
      this.textState.top.x = this.canvas.width / 2;
    }

    this.redraw();
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    this.applyText(this.textState.top);
    this.applyText(this.textState.bottom);
  }

  handleControlsChange(event) {
    if (event.target.classList.contains("text-size")) {
      this.currentTextSize = parseInt(event.target.value);
    } else if (event.target.classList.contains("text-top")) {
      this.moveText(event.target.value, "top");
    } else if (event.target.classList.contains("text-bottom")) {
      this.moveText(event.target.value, "bottom");
    }

    this.redraw();
  }

  applyText(textState) {
    const { x, y, text } = textState;
    if (!text) return;
    
    const lineHeight = this.ctx.measureText("M").width * 1.5;

    this.ctx.font = `${this.currentTextSize}px Impact`;
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.textAlign = "center";
    const lines = text.toUpperCase().split("\n");
    lines.forEach((line, index) => {
      const lineY = y + index * lineHeight;
      this.ctx.fillText(line, x, lineY);
      this.ctx.strokeText(line, x, lineY);
    });
  }

  moveText(text, position) {
    this.textState[position].text = text;
    this.redraw();
  }

  handleMouseDown(event) {
    const rect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    const textMargin = this.currentTextSize / 10;

    for (const [position, { x, y, text }] of Object.entries(this.textState)) {
      if (!text) continue;

      this.ctx.font = `${this.currentTextSize}px Impact`;
      const textWidth = this.ctx.measureText(text).width;
      const lineHeight = this.ctx.measureText("M").width * 1.5;

      const textLeft = x - textWidth / 2 - textMargin;
      const textRight = x + textWidth / 2 + textMargin;

      let textTop;
      let textBottom;
      if (position === "top") {
        textTop = y - this.currentTextSize - textMargin;
        textBottom = y + textMargin;
      } else {
        const lines = text.split("\n").length;
        textTop = y - lines * lineHeight - textMargin;
        textBottom = y + textMargin;
      }

      if (
        mouseX >= textLeft &&
        mouseX <= textRight &&
        mouseY >= textTop &&
        mouseY <= textBottom
      ) {
        this.isDragging = true;
        this.draggedText = position;
        this.dragOffset.x = mouseX - x;
        this.dragOffset.y = mouseY - y;

        break;
      }
    }
  }

  handleMouseMove(event) {
    if (!this.isDragging) return;

    const rect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    this.textState[this.draggedText].x = mouseX - this.dragOffset.x;
    this.textState[this.draggedText].y = mouseY - this.dragOffset.y;

    this.redraw();
  }

  handleMouseUp() {
    this.isDragging = false;
    this.draggedText = null;
  }

  handleSave() {
    const link = document.createElement("a");
    link.download = "meme.jpg";
    link.href = this.canvas.toDataURL("image/jpeg", 0.8);
    link.click();
    this.saveToLocalStorage();
  }

  exportProject() {
    return {
      version: "1.0",
      imageUrl: this.imageUrl,
      textState: this.textState,
      currentTextSize: this.currentTextSize
    };
  }

  importProject(projectData) {
    if (projectData.imageUrl) {
      this.imageUrl = projectData.imageUrl;
      this.image.src = this.imageUrl;
    }
    if (projectData.textState) {
      this.textState = projectData.textState;
    }
    if (projectData.currentTextSize) {
      this.currentTextSize = projectData.currentTextSize;
      const sizeInput = document.querySelector(".text-size");
      if (sizeInput) sizeInput.value = this.currentTextSize;
    }

    const topTextInput = document.querySelector(".text-top");
    const bottomTextInput = document.querySelector(".text-bottom");
    if (topTextInput) topTextInput.value = this.textState.top.text;
    if (bottomTextInput) bottomTextInput.value = this.textState.bottom.text;

    this.redraw();
  }

  handleSaveProject() {
    const projectData = this.exportProject();
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "meme-project.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  handleImportProject() {
    this.importProjectInput.click();
  }

  handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target.result);
        this.importProject(projectData);
      } catch (err) {
        console.error("Error loading project:", err);
        alert("Invalid file.");
      }
    };
    reader.readAsText(file);
  }

  saveToLocalStorage() {
    const recentMemes = JSON.parse(localStorage.getItem("recentMemes")) || [];

    recentMemes.push(this.canvas.toDataURL("image/jpeg", 0.8));
    localStorage.setItem("recentMemes", JSON.stringify(recentMemes));
    this.showRecentMemes();
  }

  showRecentMemes() {
    if (!this.recentMeme) return;
    const recentMemes = JSON.parse(localStorage.getItem("recentMemes")) || [];
    let html = "";

    recentMemes.forEach((meme, index) => {
      html += renderRecentMeme(meme, index);
    });

    this.recentMeme.innerHTML = html;
  }

  attachEventsListeners() {
    this.canvas.addEventListener("pointerdown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("pointermove", this.handleMouseMove.bind(this));
    window.addEventListener("pointerup", this.handleMouseUp.bind(this));
    
    if (this.controlsContainer) {
      this.controlsContainer.addEventListener("input", this.handleControlsChange.bind(this));
    }
    if (this.saveButton) {
      this.saveButton.addEventListener("click", this.handleSave.bind(this));
    }
    if (this.saveProjectButton) {
      this.saveProjectButton.addEventListener("click", this.handleSaveProject.bind(this));
    }
    if (this.importProjectButton) {
      this.importProjectButton.addEventListener("click", this.handleImportProject.bind(this));
    }
    if (this.importProjectInput) {
      this.importProjectInput.addEventListener("change", this.handleFileImport.bind(this));
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MemeEditor };
} else {
  const params = new URLSearchParams(window.location.search);
  const imageUrl = params.get("imageUrl") || "assets/placeholder.svg";
  window.memeEditor = new MemeEditor(".editor-canvas", imageUrl);
}
