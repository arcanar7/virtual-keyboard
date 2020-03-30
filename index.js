import Button from './src/button.js'
import ButtonWord from './src/buttonWord.js'
import ButtonAlternative from './src/buttonAlternative.js'
import arrayButtons from './src/arrayButtons.js'
import { addAlwaysShift, isCaps, isShift, runOnKeys, isArrow, isCtrl } from './src/utils.js'

class Keyboard {
  constructor() {
    this.capsLock = false
    this.shift = false
    this.alwaysShift = false
    this.mouseShift = false
    this.nodeShift = null
    this.keys = []
    this.lang = localStorage.getItem('lang') || 'en'
    this.textArea = document.createElement('textarea')
  }

  init() {
    const wrapper = document.createElement('div')
    const keyboard = document.createElement('div')
    const keyboardKeys = document.createElement('div')
    const info = document.createElement('p')

    wrapper.classList.add('wrapper')
    this.textArea.classList.add('text')
    keyboard.classList.add('keyboard')
    keyboardKeys.classList.add('keyboard__keys')
    info.textContent = `Смена языка ввода - 'Ctrl' + 'Shift'`

    keyboardKeys.append(this.createKeys())
    keyboard.append(keyboardKeys)
    wrapper.append(this.textArea, keyboard, info)
    document.body.append(wrapper)

    runOnKeys(
      this.changeLang.bind(this),
      ['ShiftLeft', 'ControlLeft'],
      ['ShiftRight', 'ControlRight'],
    )
    document.addEventListener('keydown', this.highlightButton.bind(this))
    document.addEventListener('keyup', this.removeHighlightButton.bind(this))
    document.addEventListener('mouseup', this.fixSticking.bind(this))
  }

  createKeys() {
    const fragment = document.createDocumentFragment()
    let line = document.createElement('div')
    line.classList.add('line')
    for (const button of arrayButtons) {
      const { text, wide, altText, br, type, code } = button
      const newButton = createButton(text, wide, this.lang, altText, type, code)
      newButton.init()
      this.addEventOnButtons(newButton)
      addAlwaysShift(text.en, newButton)
      this.keys.push(newButton)
      line.append(newButton.node)
      if (br) {
        fragment.append(line)
        line = document.createElement('div')
        line.classList.add('line')
      }
    }
    return fragment
  }

  addEventOnButtons(button) {
    switch (button.text.en) {
      case 'Backspace':
        button.node.addEventListener('click', this.backspaceHandler.bind(this))
        break
      case 'Tab':
        button.node.addEventListener('click', this.tabHandler.bind(this))
        break
      case 'DEL':
        button.node.addEventListener('click', this.delHandler.bind(this))
        break
      case 'Caps Lock':
        button.node.addEventListener('click', this.capsHandler.bind(this))
        break
      case 'ENTER':
        button.node.addEventListener('click', this.enterHandler.bind(this))
        break
      case 'Shift':
        button.node.addEventListener('click', this.shiftHandler.bind(this))
        button.node.addEventListener('mousedown', this.shiftMouseDownHandler.bind(this))
        button.node.addEventListener('mouseup', this.shiftMouseUpHandler.bind(this))
        break
      case '&#8593;':
        button.node.addEventListener('click', this.arrowUpHandler.bind(this))
        break
      case 'Ctrl':
        button.node.addEventListener('click', this.ctrlHandler.bind(this))
        break
      case 'Win':
        button.node.addEventListener('click', this.winHandler.bind(this))
        break
      case 'Alt':
        button.node.addEventListener('click', this.altHandler.bind(this))
        break
      case '&#8592;':
        button.node.addEventListener('click', this.arrowLeftHandler.bind(this))
        break
      case '&#8595;':
        button.node.addEventListener('click', this.arrowDownHandler.bind(this))
        break
      case '&#8594;':
        button.node.addEventListener('click', this.arrowRightHandler.bind(this))
        break
      default:
        button.node.addEventListener('click', this.printText.bind(this))
    }
  }

  backspaceHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea
    if (start !== end) {
      this.textArea.value = `${val.slice(0, start)}${val.slice(end)}`
      this.setPositionCursor(start)
    } else if (start !== 0) {
      this.textArea.value = `${val.slice(0, start - 1)}${val.slice(start)}`
      this.setPositionCursor(start - 1)
    } else {
      this.setPositionCursor(start)
    }
  }

  tabHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea
    this.textArea.value = `${val.substring(0, start)}\t${val.substring(end)}`
    this.setPositionCursor(start + 1)
  }

  delHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea
    if (start !== end) {
      this.textArea.value = `${val.slice(0, start)}${val.slice(end)}`
    } else if (end !== val.length) {
      this.textArea.value = `${val.slice(0, start)}${val.slice(start + 1)}`
    }
    this.setPositionCursor(start)
  }

  capsHandler(e) {
    const { selectionStart: start } = this.textArea
    this.capsLock = !this.capsLock
    e.target.classList.toggle('active')
    for (const button of this.keys) {
      button.caps()
    }
    this.setPositionCursor(start)
  }

  enterHandler() {
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea
    this.textArea.value = `${val.substring(0, start)}\n${val.substring(end)}`
    this.setPositionCursor(start + 1)
  }

  shiftHandler(e) {
    const { selectionStart: start } = this.textArea
    if (e.target.classList.contains('always-shift') && (!this.shift || this.alwaysShift)) {
      this.alwaysShift = !this.alwaysShift
      this.setShiftedButtons()
      const alwaysShift = document.querySelectorAll('.always-shift')
      alwaysShift[0].classList.toggle('active')
      alwaysShift[1].classList.toggle('active')
    } else if (!e.isTrusted) {
      e.target.classList.toggle('active')
      this.setShiftedButtons()
    }
    this.setPositionCursor(start)
  }

  shiftMouseDownHandler(e) {
    if (!this.mouseShift) {
      this.mouseShift = true
      this.nodeShift = e.target
      this.shiftMouseHandler()
    }
  }

  shiftMouseUpHandler() {
    if (this.mouseShift) {
      this.mouseShift = false
      this.shiftMouseHandler()
    }
  }

  shiftMouseHandler() {
    const { selectionStart: start } = this.textArea
    this.nodeShift.classList.toggle('active')
    this.setShiftedButtons()
    this.setPositionCursor(start)
  }

  setShiftedButtons() {
    this.shift = !this.shift
    for (const button of this.keys) {
      button.shift()
    }
  }

  arrowUpHandler() {
    this.setPositionCursor(0)
  }

  ctrlHandler() {
    const { selectionStart: start } = this.textArea
    if (this.shift || this.alwaysShift) this.changeLang()
    this.setPositionCursor(start)
  }

  winHandler() {
    const { selectionStart: start } = this.textArea
    this.setPositionCursor(start)
  }

  altHandler() {
    const { selectionStart: start } = this.textArea
    this.setPositionCursor(start)
  }

  arrowLeftHandler() {
    const { selectionStart: start } = this.textArea
    this.setPositionCursor(start - 1)
  }

  arrowDownHandler() {
    const { value: val } = this.textArea
    this.setPositionCursor(val.length)
  }

  arrowRightHandler() {
    const { selectionStart: start } = this.textArea
    this.setPositionCursor(start + 1)
  }

  printText(e) {
    const word = e.target.textContent
    const { value: val, selectionStart: start, selectionEnd: end } = this.textArea
    if (this.capsLock && this.shift) {
      this.textArea.value = `${val.substring(0, start)}${word.toLowerCase()}${val.substring(end)}`
    } else if (this.capsLock || this.shift) {
      this.textArea.value = `${val.substring(0, start)}${word.toUpperCase()}${val.substring(end)}`
    } else {
      this.textArea.value = `${val.substring(0, start)}${word.toLowerCase()}${val.substring(end)}`
    }
    this.setPositionCursor(start + 1)
  }

  changeLang() {
    this.lang = this.lang === 'en' ? 'ru' : 'en'
    localStorage.setItem('lang', this.lang)
    for (const button of this.keys) {
      button.changeLanguage(this.lang)
      if (button.text.en === 'Shift') {
        const alwaysShift = document.createElement('button')
        alwaysShift.classList.add('always-shift')
        if (this.alwaysShift) alwaysShift.classList.add('active')
        button.node.append(alwaysShift)
      }
    }
  }

  setPositionCursor(position) {
    this.textArea.focus()
    this.textArea.selectionStart = position
    this.textArea.selectionEnd = position
  }

  highlightButton(e) {
    const button = this.keys.find(i => i.code === e.code)
    if (button) {
      if (isArrow(button.code)) {
        button.node.classList.add('active')
      } else {
        e.preventDefault()

        if (isCaps(button.code) && e.repeat) return null
        if (isShift(button.code) && e.repeat) return null
        if (isCtrl(button.code) && e.repeat) return null
        if (!isCaps(button.code) && !isShift(button.code)) {
          button.node.classList.add('active')
        }

        button.node.click()
      }
    }
    return null
  }

  removeHighlightButton(e) {
    const button = this.keys.find(i => i.code === e.code)
    if (button) {
      if (isArrow(button.code)) {
        button.node.classList.remove('active')
      } else {
        e.preventDefault()

        if (!isCaps(button.code) && !isShift(button.code)) {
          button.node.classList.remove('active')
        }

        if (isShift(button.code)) {
          button.node.click()
        }
      }
    }
    return null
  }

  fixSticking(e) {
    if (!isShift(e.target.textContent) && this.mouseShift) {
      this.mouseShift = false
      this.setShiftedButtons()
      const el = this.keys.find(i => i.node.classList.contains('active') && isShift(i.code))
      el.node.classList.remove('active')
    }
  }
}

function createButton(text, wide, lang, altText, type, code) {
  let button
  switch (type) {
    case 'alternative':
      button = new ButtonAlternative(text, wide, lang, altText, code)
      break
    case 'functional':
      button = new Button(text, wide, lang, altText, code)
      break
    default:
      button = new ButtonWord(text, wide, lang, altText, code)
      break
  }
  return button
}

window.onload = () => {
  const keyboard = new Keyboard()
  keyboard.init()
}
