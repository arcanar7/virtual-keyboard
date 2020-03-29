class Button {
  constructor(
    text = { en: 'a', ru: 'а' },
    wide = 'normal',
    altText = { en: 'A', ru: 'А' },
    code = 'KeyA',
  ) {
    this.node = null
    this.wide = wide
    this.lang = 'en'
    this.text = text
    this.altText = altText
    this.code = code
  }

  init() {
    this.node = document.createElement('button')
    this.node.classList.add('keyboard__key')
    switch (this.wide) {
      case 'wide':
        this.node.classList.add('keyboard__key_wide')
        break
      case 'middle-wide':
        this.node.classList.add('keyboard__key_middle-wide')
        break
      case 'ultra-wide':
        this.node.classList.add('keyboard__key_ultra-wide')
        break
      default:
        break
    }

    this.changeText()
  }

  changeText() {
    this.node.innerHTML = this.text[this.lang]
  }

  changeLanguage(lang) {
    this.lang = lang
    this.changeText()
  }

  shift() {
    this.node.classList.remove('shift')
  }

  caps() {
    this.node.classList.remove('shift')
  }
}

export default Button
