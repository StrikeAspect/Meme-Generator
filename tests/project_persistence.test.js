
// Mocks for browser environment
const mockCanvas = {
  getContext: () => ({
    clearRect: () => {},
    drawImage: () => {},
    fillText: () => {},
    strokeText: () => {},
    measureText: () => ({ width: 10 }),
  }),
  toDataURL: () => 'data:image/png;base64,mock_data',
  addEventListener: () => {},
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
  width: 100,
  height: 100
};

global.document = {
  querySelector: (selector) => {
    if (selector === '.editor-canvas') return mockCanvas;
    if (selector === '.controls') return { addEventListener: () => {}, innerHTML: '' };
    if (selector === '.save-button') return { addEventListener: () => {} };
    if (selector === '.save-project-button') return { addEventListener: () => {} };
    if (selector === '.import-project-button') return { addEventListener: () => {} };
    if (selector === '#import-project-input') return { addEventListener: () => {}, click: () => {} };
    if (selector === '.recent-memes') return { innerHTML: '' };
    if (selector === '.text-size') return { value: 50 };
    if (selector === '.text-top') return { value: '' };
    if (selector === '.text-bottom') return { value: '' };
    return { addEventListener: () => {} };
  },
  createElement: () => ({ click: () => {} }),
};

global.window = {
  addEventListener: () => {},
  location: { search: '' },
};

global.URLSearchParams = class {
  get() { return null; }
};

global.Image = class {
  constructor() {
    setTimeout(() => this.onload && this.onload(), 0);
  }
};

global.localStorage = {
  storage: {},
  getItem: function(key) { return this.storage[key] || null; },
  setItem: function(key, val) { this.storage[key] = val; },
  clear: function() { this.storage = {}; }
};

global.Blob = class {
    constructor(content, options) {
        this.content = content;
        this.options = options;
    }
};

global.URL = {
    createObjectURL: () => 'blob:mock-url',
    revokeObjectURL: () => {}
};

// Mock ui.js functions
global.renderRecentMeme = () => '<li>Recent Meme</li>';
global.renderEditorControls = () => '<div>Controls</div>';

// Load the MemeEditor (using the module.exports fallback)
const { MemeEditor } = require('../scripts/canvas.js');

describe('MemeEditor Project Persistence', () => {
  let editor;

  beforeEach(() => {
    localStorage.clear();
    editor = new MemeEditor('.editor-canvas', 'test.png');
  });

  test('exportProject should return the current state', () => {
    editor.textState.top.text = "Top Text";
    editor.textState.bottom.text = "Bottom Text";
    editor.currentTextSize = 40;

    const projectData = editor.exportProject();

    expect(projectData.imageUrl).toBe('test.png');
    expect(projectData.textState.top.text).toBe('Top Text');
    expect(projectData.textState.bottom.text).toBe('Bottom Text');
    expect(projectData.currentTextSize).toBe(40);
  });

  test('importProject should restore the state', () => {
    const projectData = {
      imageUrl: 'new-image.png',
      textState: {
        top: { text: "Imported Top", x: 10, y: 20 },
        bottom: { text: "Imported Bottom", x: 30, y: 40 }
      },
      currentTextSize: 60
    };

    editor.importProject(projectData);

    expect(editor.imageUrl).toBe('new-image.png');
    expect(editor.textState.top.text).toBe('Imported Top');
    expect(editor.textState.top.x).toBe(10);
    expect(editor.textState.bottom.text).toBe('Imported Bottom');
    expect(editor.currentTextSize).toBe(60);
  });
});
