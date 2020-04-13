import Button from './src/components/button.js';
import ButtonWord from './src/components/buttonWord.js';
import ButtonAlternative from './src/components/buttonAlternative.js';

import arrayButtons from './src/helpers/arrayButtons.js';
import * as utils from './src/helpers/utils.js';
import * as keys from './src/helpers/keys.js';

class Keyboard {
  constructor() {
    this.capsLock = false;
    this.shift = false;
    this.alwaysShift = false;
    this.mouseShift = false;
    this.nodeShift = null;
    this.keys = [];
    this.lang = localStorage.getItem('lang') || 'en';
    this.textArea = document.createElement('textarea');
  }

  init() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    const keyboardKeys = document.createElement('div');
    keyboardKeys.classList.add('keyboard__keys');
    keyboardKeys.addEventListener('click', this.clickButton.bind(this));

    const info = document.createElement('p');
    info.textContent = `Смена языка ввода - '${keys.ctrlKey}' + '${keys.shiftKey}'`;

    const infoSystem = document.createElement('p');
    infoSystem.textContent = 'Сделано в ОС Windows';

    this.textArea.classList.add('text');

    keyboardKeys.append(this.createKeys());
    keyboard.append(keyboardKeys);
    wrapper.append(this.textArea, keyboard, info, infoSystem);
    document.body.append(wrapper);

    utils.runOnKeys(
      this.changeLang.bind(this),
      [keys.shiftLeftKey, keys.controlLeftKey],
      [keys.shiftRightKey, keys.controlRightKey],
    );
    document.addEventListener('keydown', this.highlightButton.bind(this));
    document.addEventListener('keyup', this.removeHighlightButton.bind(this));
    document.addEventListener('mouseup', this.fixSticking.bind(this));
  }

  createKeys() {
    const fragment = document.createDocumentFragment();
    let line = document.createElement('div');
    line.classList.add('line');
    for (const button of arrayButtons) {
      const { text, wide, altText, br, type, code } = button;
      const newButton = createButton(text, wide, this.lang, altText, type, code);
      newButton.init();
      if (text.en === keys.shiftKey) {
        newButton.node.addEventListener('mousedown', this.shiftMouseDownHandler.bind(this));
        newButton.node.addEventListener('mouseup', this.shiftMouseUpHandler.bind(this));
      }
      utils.addAlwaysShift(text.en, newButton);
      this.keys.push(newButton);
      line.append(newButton.node);
      if (br) {
        fragment.append(line);
        line = document.createElement('div');
        line.classList.add('line');
      }
    }
    return fragment;
  }

  clickButton(event) {
    if (event.target.dataset.button) {
      switch (event.target.dataset.button) {
        case keys.backspaceKey:
          this.backspaceHandler();
          break;
        case keys.tabKey:
          this.tabHandler();
          break;
        case keys.delKey:
          this.delHandler();
          break;
        case keys.capsKey:
          this.capsHandler(event);
          break;
        case keys.enterKey:
          this.enterHandler();
          break;
        case keys.shiftKey:
          this.shiftHandler(event);
          break;
        case keys.arrowUpKey:
          this.arrowUpHandler();
          break;
        case keys.ctrlKey:
          this.ctrlHandler();
          break;
        case keys.winKey:
          this.winHandler();
          break;
        case keys.altKey:
          this.altHandler();
          break;
        case keys.arrowLeftKey:
          this.arrowLeftHandler();
          break;
        case keys.arrowDownKey:
          this.arrowDownHandler();
          break;
        case keys.arrowRightKey:
          this.arrowRightHandler();
          break;
        default:
          this.printText(event);
      }
    }
  }

  backspaceHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea;
    if (start !== end) {
      this.textArea.value = `${val.slice(0, start)}${val.slice(end)}`;
      this.setPositionCursor(start);
    } else if (start !== 0) {
      this.textArea.value = `${val.slice(0, start - 1)}${val.slice(start)}`;
      this.setPositionCursor(start - 1);
    } else {
      this.setPositionCursor(start);
    }
  }

  tabHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea;
    this.textArea.value = `${val.substring(0, start)}\t${val.substring(end)}`;
    this.setPositionCursor(start + 1);
  }

  delHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea;
    if (start !== end) {
      this.textArea.value = `${val.slice(0, start)}${val.slice(end)}`;
    } else if (end !== val.length) {
      this.textArea.value = `${val.slice(0, start)}${val.slice(start + 1)}`;
    }
    this.setPositionCursor(start);
  }

  capsHandler(e) {
    const { selectionStart: start } = this.textArea;
    this.capsLock = !this.capsLock;
    e.target.classList.toggle('active');
    for (const button of this.keys) {
      button.caps();
    }
    this.setPositionCursor(start);
  }

  enterHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea;
    this.textArea.value = `${val.substring(0, start)}\n${val.substring(end)}`;
    this.setPositionCursor(start + 1);
  }

  shiftHandler(e) {
    const { selectionStart: start } = this.textArea;
    if (e.target.classList.contains('always-shift') && (!this.shift || this.alwaysShift)) {
      this.alwaysShift = !this.alwaysShift;
      this.setShiftedButtons();
      const alwaysShift = document.querySelectorAll('.always-shift');
      alwaysShift[0].classList.toggle('active');
      alwaysShift[1].classList.toggle('active');
    } else if (!e.isTrusted) {
      e.target.classList.toggle('active');
      this.setShiftedButtons();
    }
    this.setPositionCursor(start);
  }

  shiftMouseDownHandler(e) {
    if (!this.mouseShift && utils.isShift(e.target.textContent)) {
      this.mouseShift = true;
      this.nodeShift = e.target;
      this.shiftMouseHandler();
    }
  }

  shiftMouseUpHandler(e) {
    if (this.mouseShift && utils.isShift(e.target.textContent)) {
      this.mouseShift = false;
      this.shiftMouseHandler();
    }
  }

  shiftMouseHandler() {
    const { selectionStart: start } = this.textArea;
    this.nodeShift.classList.toggle('active');
    this.setShiftedButtons();
    this.setPositionCursor(start);
  }

  setShiftedButtons() {
    this.shift = !this.shift;
    for (const button of this.keys) {
      button.shift();
    }
  }

  arrowUpHandler() {
    this.setPositionCursor(0);
  }

  ctrlHandler() {
    const { selectionStart: start } = this.textArea;
    if (this.shift || this.alwaysShift) {
      this.changeLang();
    }
    this.setPositionCursor(start);
  }

  winHandler() {
    const { selectionStart: start } = this.textArea;
    this.setPositionCursor(start);
  }

  altHandler() {
    const { selectionStart: start } = this.textArea;
    this.setPositionCursor(start);
  }

  arrowLeftHandler() {
    const { selectionStart: start } = this.textArea;
    this.setPositionCursor(start - 1);
  }

  arrowDownHandler() {
    const { value: val } = this.textArea;
    this.setPositionCursor(val.length);
  }

  arrowRightHandler() {
    const { selectionStart: start } = this.textArea;
    this.setPositionCursor(start + 1);
  }

  printText(e) {
    const word = e.target.textContent;
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea;
    if (this.capsLock && this.shift) {
      this.textArea.value = `${val.substring(0, start)}${word.toLowerCase()}${val.substring(end)}`;
    } else if (this.capsLock || this.shift) {
      this.textArea.value = `${val.substring(0, start)}${word.toUpperCase()}${val.substring(end)}`;
    } else {
      this.textArea.value = `${val.substring(0, start)}${word.toLowerCase()}${val.substring(end)}`;
    }
    this.setPositionCursor(start + 1);
  }

  changeLang() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', this.lang);
    for (const button of this.keys) {
      button.changeLanguage(this.lang);
      utils.addAlwaysShift(button.text.en, button, this.alwaysShift);
    }
  }

  setPositionCursor(position) {
    this.textArea.focus();
    this.textArea.selectionStart = position;
    this.textArea.selectionEnd = position;
  }

  highlightButton(e) {
    const button = this.keys.find((i) => i.code === e.code);
    if (button) {
      if (utils.isArrow(button.code)) {
        button.node.classList.add('active');
      } else {
        e.preventDefault();

        if (utils.isRepeat(button.code, e)) {
          return null;
        }
        if (!utils.isCaps(button.code) && !utils.isShift(button.code)) {
          button.node.classList.add('active');
        }

        button.node.click();
      }
    }
    return null;
  }

  removeHighlightButton(e) {
    const button = this.keys.find((i) => i.code === e.code);
    if (button) {
      if (utils.isArrow(button.code)) {
        button.node.classList.remove('active');
      } else {
        e.preventDefault();

        if (!utils.isCaps(button.code) && !utils.isShift(button.code)) {
          button.node.classList.remove('active');
        }

        if (utils.isShift(button.code)) {
          button.node.click();
        }
      }
    }
    return null;
  }

  fixSticking(e) {
    if (!utils.isShift(e.target.textContent) && this.mouseShift) {
      this.mouseShift = false;
      this.setShiftedButtons();
      const el = this.keys.find(
        (i) => i.node.classList.contains('active') && utils.isShift(i.code),
      );
      if (el) {
        el.node.classList.remove('active');
      }
    }
  }
}

function createButton(text, wide, lang, altText, type, code) {
  let button;
  switch (type) {
    case keys.alternative:
      button = new ButtonAlternative(text, wide, lang, altText, code);
      break;
    case keys.functional:
      button = new Button(text, wide, lang, altText, code);
      break;
    default:
      button = new ButtonWord(text, wide, lang, altText, code);
      break;
  }
  return button;
}

window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.init();
};
