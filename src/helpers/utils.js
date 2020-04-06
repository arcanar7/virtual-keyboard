import * as keys from './keys.js';

function addAlwaysShift(text, button, isAlwaysShift = false) {
  if (text === keys.shiftKey) {
    const alwaysShift = document.createElement('button');
    alwaysShift.classList.add('always-shift');
    alwaysShift.dataset.button = text;
    if (isAlwaysShift) {
      alwaysShift.classList.add('active');
    }
    button.node.append(alwaysShift);
  }
}

function isCaps(code) {
  return code === keys.capsKey;
}

function isShift(code) {
  return [keys.shiftKey, keys.shiftLeftKey, keys.shiftRightKey].includes(code);
}

function isCtrl(code) {
  return [keys.controlLeftKey, keys.controlRightKey].includes(code);
}

function isArrow(code) {
  return [keys.arrowUp, keys.arrowLeft, keys.arrowDown, keys.arrowRight].includes(code);
}

function runOnKeys(func, ...combinations) {
  const pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    for (const combination of combinations) {
      if (pressed.has(combination[0]) && pressed.has(combination[1])) {
        pressed.clear();
        func(event);
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

export { addAlwaysShift, isCaps, isShift, runOnKeys, isArrow, isCtrl };
