
class SlideText {

   constructor(value) {
     this.container = document.createElement('div')
     this.container.setAttribute('class', 'text-animation')
     this.container.addEventListener('transitionend', () => this._ended(), false)
     document.body.prepend(this.container)

     this.value = document.createElement('span')
     this.value.innerText = value
     this.container.appendChild(this.value)
   }
   
   animateTo(value, direction) {
     this.done = false
 
     if (this.next) {
       this.value = this.next
     }
 
     this.next = document.createElement('span')
     this.next.textContent = value
     this.container.appendChild(this.next)
     
     this.next.style.top = direction == 'top' ? '20px' : '-20px'
 
     setTimeout(() => {
       this.value.setAttribute('class', direction)
       this.next.setAttribute('class', direction)
     }, 100);
   }
 
   _ended() {
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