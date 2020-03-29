import Button from './button.js'

class ButtonAlternative extends Button {
  constructor(
    text = { en: 'a', ru: 'а' },
    wide = 'normal',
    altText = { en: 'A', ru: 'А' },
    code = 'KeyA',
  ) {
    super(text, wide, altText, code)
    this.shifted = false
  }

  shift() {
    // eslint-disable-next-line no-extra-semi
    ;[this.text, this.altText] = [this.altText, this.text]
    this.changeText()
    this.node.classList.toggle('shift')
  }

  caps() {
    this.node.classList.toggle('shift')
  }
}

export default ButtonAlternative
