
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
    if (selector === '.controls') return { addEventListener: () => {} };
    if (selector === '.save-button') return { addEventListener: () => {} };
    if (selector === '.recent-memes') return { innerHTML: '' };
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

const { MemeEditor } = require('../scripts/canvas.js');

describe('MemeEditor LocalStorage Integration', () => {
  let editor;

  beforeEach(() => {
    localStorage.clear();
    editor = new MemeEditor('.editor-canvas', 'test.png');
  });

  test('saveToLocalStorage should save meme data to localStorage', () => {
    editor.saveToLocalStorage();

    const storedData = JSON.parse(localStorage.getItem('recentMemes'));
    expect(storedData).toHaveLength(1);
    expect(storedData[0]).toBe('data:image/png;base64,mock_data');
  });

  test('saveToLocalStorage should append new memes to existing ones', () => {
    localStorage.setItem('recentMemes', JSON.stringify(['existing_meme']));

    editor.saveToLocalStorage();

    const storedData = JSON.parse(localStorage.getItem('recentMemes'));
    expect(storedData).toHaveLength(2);
    expect(storedData[0]).toBe('existing_meme');
    expect(storedData[1]).toBe('data:image/png;base64,mock_data');
  });

  test('showRecentMemes should update the DOM', () => {
    localStorage.setItem('recentMemes', JSON.stringify(['meme1', 'meme2']));

    editor.showRecentMemes();

    // Check if innerHTML was updated with gallery items
    expect(editor.recentMeme.innerHTML).toContain('gallery-item');
    expect(editor.recentMeme.innerHTML).toContain('meme1');
    expect(editor.recentMeme.innerHTML).toContain('meme2');
  });
});
