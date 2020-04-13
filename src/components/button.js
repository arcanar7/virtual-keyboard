class Button {
  constructor(
    text = { en: 'a', ru: 'а' },
    wide = 'normal',
    lang = 'en',
    altText = { en: 'A', ru: 'А' },
    code = 'KeyA',
  ) {
    this.node = null;
    this.text = text;
    this.wide = wide;
    this.lang = lang;
    this.altText = altText;
    this.code = code;
  }

  init() {
    this.node = document.createElement('button');
    this.node.classList.add('keyboard__key');
    this.node.dataset.button = this.text.en;
    switch (this.wide) {
      case 'wide':
        this.node.classList.add('keyboard__key_wide');
        break;
      case 'middle-wide':
        this.node.classList.add('keyboard__key_middle-wide');
        break;
      case 'ultra-wide':
        this.node.classList.add('keyboard__key_ultra-wide');
        break;
      default:
        break;
    }

    this.changeText();
  }

  changeText() {
    this.node.innerHTML = this.text[this.lang];
  }

  changeLanguage(lang) {
    this.lang = lang;
    this.changeText();
  }

  shift() {
    this.node.classList.remove('shift');
  }

  caps() {
    this.node.classList.remove('shift');
  }
}

export default Button;
