class MemeEditor {
  constructor(canvasSelector, imageUrl) {
    this.canvas = document.querySelector(canvasSelector);
    this.ctx = this.canvas.getContext("2d");

    this.controls = document.querySelector(".controls");
    this.saveButton = document.querySelector(".save-button");
    this.recentMeme = document.querySelector(".recent-memes");

    this.image = new Image();
    this.image.crossOrigin = "anonymous";
    this.image.src = imageUrl || "assets/placeholder.svg";
    this.image.onload = this.setupCanvasAndRedraw.bind(this);
    this.image.onerror = () => {
      if (!this.image.src.includes("assets/placeholder.svg")) {
        this.image.src = "assets/placeholder.svg";
      }
    };

    this.topText = "";
    this.bottomText = "";
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

    this.textState.bottom.y = this.canvas.height - 50;
    this.textState.bottom.x = this.canvas.width / 2;

    this.textState.top.x = this.canvas.width / 2;

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

  saveToLocalStorage() {
    const recentMemes = JSON.parse(localStorage.getItem("recentMemes")) || [];

    recentMemes.push(this.canvas.toDataURL("image/jpeg", 0.8));
    localStorage.setItem("recentMemes", JSON.stringify(recentMemes));
    this.showRecentMemes();
  }

  showRecentMemes() {
    const recentMemes = JSON.parse(localStorage.getItem("recentMemes")) || [];
    let html = "";

    recentMemes.forEach((meme, index) => {
      const galleryItem = `
      <li class="gallery-item">
        <img src="${meme}" alt="Meme recente numero ${index + 1}" />
        <a href="${meme}" download="recent-meme-${index + 1}.png">Scarica</a>
      </li>
      `;
      html += galleryItem;
    });

    this.recentMeme.innerHTML = html;
  }

  attachEventsListeners() {
    this.canvas.addEventListener("pointerdown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("pointermove", this.handleMouseMove.bind(this));
    window.addEventListener("pointerup", this.handleMouseUp.bind(this));
    this.controls.addEventListener("input", this.handleControlsChange.bind(this));
    this.saveButton.addEventListener("click", this.handleSave.bind(this));
  }
}

const params = new URLSearchParams(window.location.search);
const imageUrl = params.get("imageUrl") || "assets/placeholder.svg";
const memeEditor = new MemeEditor(".editor-canvas", imageUrl);
