import Button from './src/button.js'

const arrayButtons = [
  { text: { en: '`', ru: 'ё' }, wide: 'normal', altText: '', br: false },
  { text: { en: '1', ru: '1' }, wide: 'normal', altText: '', br: false },
  { text: { en: '2', ru: '2' }, wide: 'normal', altText: '', br: false },
  { text: { en: '3', ru: '3' }, wide: 'normal', altText: '', br: false },
  { text: { en: '4', ru: '4' }, wide: 'normal', altText: '', br: false },
  { text: { en: '5', ru: '5' }, wide: 'normal', altText: '', br: false },
  { text: { en: '6', ru: '6' }, wide: 'normal', altText: '', br: false },
  { text: { en: '7', ru: '7' }, wide: 'normal', altText: '', br: false },
  { text: { en: '8', ru: '8' }, wide: 'normal', altText: '', br: false },
  { text: { en: '9', ru: '9' }, wide: 'normal', altText: '', br: false },
  { text: { en: '0', ru: '0' }, wide: 'normal', altText: '', br: false },
  { text: { en: '-', ru: '-' }, wide: 'normal', altText: '', br: false },
  { text: { en: '=', ru: '=' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'Backspace', ru: 'Backspace' }, wide: 'middle-wide', altText: '', br: true },
  { text: { en: 'Tab', ru: 'Tab' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'q', ru: 'й' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'w', ru: 'ц' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'e', ru: 'у' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'r', ru: 'к' }, wide: 'normal', altText: '', br: false },
  { text: { en: 't', ru: 'е' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'y', ru: 'н' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'u', ru: 'г' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'i', ru: 'ш' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'o', ru: 'щ' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'p', ru: 'з' }, wide: 'normal', altText: '', br: false },
  { text: { en: '[', ru: 'х' }, wide: 'normal', altText: '', br: false },
  { text: { en: ']', ru: 'ъ' }, wide: 'normal', altText: '', br: false },
  { text: { en: '\\', ru: '\\' }, wide: 'wide', altText: '', br: false },
  { text: { en: 'DEL', ru: 'DEL' }, wide: 'normal', altText: '', br: true },
  { text: { en: 'Caps Lock', ru: 'Caps Lock' }, wide: 'wide', altText: '', br: false },
  { text: { en: 'a', ru: 'ф' }, wide: 'normal', altText: '', br: false },
  { text: { en: 's', ru: 'ы' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'd', ru: 'в' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'f', ru: 'а' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'g', ru: 'п' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'h', ru: 'р' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'j', ru: 'о' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'k', ru: 'л' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'l', ru: 'д' }, wide: 'normal', altText: '', br: false },
  { text: { en: ';', ru: 'ж' }, wide: 'normal', altText: '', br: false },
  { text: { en: `'`, ru: 'э' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'ENTER', ru: 'ENTER' }, wide: 'middle-wide', altText: '', br: true },
  { text: { en: 'Shift', ru: 'Shift' }, wide: 'middle-wide', altText: '', br: false },
  { text: { en: 'z', ru: 'я' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'x', ru: 'ч' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'c', ru: 'с' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'v', ru: 'м' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'b', ru: 'и' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'n', ru: 'т' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'm', ru: 'ь' }, wide: 'normal', altText: '', br: false },
  { text: { en: ',', ru: 'б' }, wide: 'normal', altText: '', br: false },
  { text: { en: '.', ru: 'ю' }, wide: 'normal', altText: '', br: false },
  { text: { en: '/', ru: '.' }, wide: 'normal', altText: '', br: false },
  { text: { en: 'Shift', ru: 'Shift' }, wide: 'middle-wide', altText: '', br: false },
  { text: { en: '&#8593;', ru: '&#8593;' }, wide: 'normal', altText: '', br: true },
  { text: { en: 'Ctrl', ru: 'Ctrl' }, wide: 'wide', altText: '', br: false },
  { text: { en: 'Win', ru: 'Win' }, wide: 'wide', altText: '', br: false },
  { text: { en: 'Alt', ru: 'Alt' }, wide: 'wide', altText: '', br: false },
  { text: { en: 'Space', ru: 'Space' }, wide: 'ultra-wide', altText: '', br: false },
  { text: { en: 'Alt', ru: 'Alt' }, wide: 'wide', altText: '', br: false },
  { text: { en: 'Ctrl', ru: 'Ctrl' }, wide: 'wide', altText: '', br: false },
  { text: { en: '&#8592;', ru: '&#8592;' }, wide: 'normal', altText: '', br: false },
  { text: { en: '&#8595;', ru: '&#8595;' }, wide: 'normal', altText: '', br: false },
  { text: { en: '&#8594;', ru: '&#8594;' }, wide: 'normal', altText: '', br: true },
]

class Keyboard {
  constructor() {
    this.capsLock = false
    this.keys = []
  }

  init() {
    const wrapper = document.createElement('div')
    this.textArea = document.createElement('textarea')
    const keyboard = document.createElement('div')
    const keyboardKeys = document.createElement('div')
    wrapper.classList.add('wrapper')
    this.textArea.classList.add('text')
    keyboard.classList.add('keyboard')
    keyboardKeys.classList.add('keyboard__keys')

    keyboardKeys.append(this.createKeys())
    keyboard.append(keyboardKeys)
    wrapper.append(this.textArea, keyboard)

    document.body.append(wrapper)
  }

  createKeys() {
    const fragment = document.createDocumentFragment()
    let line = document.createElement('div')
    line.classList.add('line')
    for (const button of arrayButtons) {
      const { text, wide, altText, br } = button
      const newButton = new Button(text, wide, altText)
      newButton.init()
      this.addEvent(newButton)
      this.keys.push(newButton)
      line.append(newButton.node)
      if (br) {
        fragment.append(line)
        line = document.createElement('div')
      }
    }
    return fragment
  }

  addEvent(button) {
    switch (button.text.en) {
      case 'Shift':
        button.node.addEventListener('mousedown', this.shiftHandlerDown.bind(this))
        button.node.addEventListener('mouseup', this.shiftHandlerUp.bind(this))
        break
      default:
        button.node.addEventListener('click', this.printText.bind(this))
    }
  }

  shiftHandlerDown() {
    for (const button of this.keys) {
      button.node.innerHTML = button.text.en.toUpperCase()
    }
  }

  shiftHandlerUp() {
    for (const button of this.keys) {
      button.node.innerHTML = button.text.en.toLowerCase()
    }
  }

  printText(e) {
    this.textArea.value += this.capsLock
      ? e.target.textContent.toUpperCase()
      : e.target.textContent.toLowerCase()
  }
}

window.onload = () => {
  const keyboard = new Keyboard()
  keyboard.init()
}
