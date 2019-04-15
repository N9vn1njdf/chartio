
class SlideText {

  constructor(value, element) {
    this.container = document.createElement('span')
    this.container.setAttribute('class', 'text-animation')
    this.container.addEventListener('transitionend', () => this._ended(), false)
    element.appendChild(this.container)

    this.value = document.createElement('span')
    this.value.innerText = value
    
    this.container.style.width = (this.value.innerText.length * 8) + 'px'
    this.container.appendChild(this.value)
  }
  
  animateTo(value, direction) {    
    if (this.progress) {
      return
    }

    this.progress = true
    this.done = false

    if (this.next) {
      this.value = this.next
    }

    this.next = document.createElement('span')
    this.next.textContent = value    
    this.container.appendChild(this.next)
    this.container.style.width = (this.next.textContent.length * 8) + 'px'
    this.next.style.top = direction == 'top' ? '20px' : '-20px'

    setTimeout(() => {
      this.value.setAttribute('class', direction)
      this.next.setAttribute('class', direction)
    }, 10)
  }

  _ended() {
    this.progress = false

    if (this.done) {
      return
    }

    this.done = true
    this.next.removeAttribute('style')
    this.next.removeAttribute('class')    
    this.next.removeEventListener('transitionend', () => this.ended())
    this.container.removeChild(this.value)
  }
}

export {
   SlideText
}