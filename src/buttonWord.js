import Button from './button.js'

class ButtonWord extends Button {
  constructor(
    text = { en: 'a', ru: 'а' },
    wide = 'normal',
    lang = 'en',
    altText = { en: 'A', ru: 'А' },
    code = 'KeyA',
  ) {
    super(text, wide, lang, altText, code)
  }

  shift() {
    this.node.classList.toggle('shift')
  }

  caps() {
    this.node.classList.toggle('shift')
  }
}

export default ButtonWord
