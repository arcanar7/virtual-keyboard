class Keyboard {
  constructor() {
    this.properties = {
      value: '',
      capsLock: false,
    }
    this.keys = []
  }

  init() {
    const wrapper = document.createElement('div')
    const text = document.createElement('textarea')
    const keyboard = document.createElement('div')
    const keyboardKeys = document.createElement('div')
    wrapper.classList.add('wrapper')
    text.classList.add('text')
    keyboard.classList.add('keyboard')
    keyboardKeys.classList.add('keyboard__keys')

    keyboardKeys.append(this.createKeys())
    keyboard.append(keyboardKeys)
    wrapper.append(text, keyboard)

    document.body.append(wrapper)
  }

  createKeys() {}
}

window.onload = () => {
  const keyboard = new Keyboard()
  keyboard.init()
}
