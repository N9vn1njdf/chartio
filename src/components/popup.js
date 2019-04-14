import { Component } from 'core'
import { SlideText } from '../helpers.js'

/**
 * show(index, input) - показать попап
 * hide() - скрыть попап
 */
export default class Popup extends Component {

  /**
   * @override
   */
  $onData({dates, columns, $colors, $names}) {
    
  }

  /**
   * @override
   */
  $build(theme, locale) {
    this.id = this.$scaffold.id
    this.index

    this.createPopup()
  }

  show(index) {
    index = index+1

    // Создаем или анимируем данные для попапа
    if (this.index == null) {      
      this.createPopupData(index)
    } else if (this.index !== index) {
      this.animatePopupData(index)
    }

    // this.index = index

    // Позиционирование попапа
    let y = this.$canvas.offsetTop + this.$scaffold.input.y - 20
    let x = this.$scaffold.input.event.x + 20         
    
    if (x + this.div.offsetWidth > this.$canvas.width) {
      x = this.$scaffold.input.event.x - 20 - this.div.offsetWidth
    }

    this.div.style.display = 'block'
    this.div.style.top = y + 'px'
    this.div.style.left = x + 'px'
  }

  hide() {      
    // this.line.alpha = 0
    this.div.style.display = 'none'
    // this.circles.children.forEach(circle => circle.alpha = 0)
  }

  createPopup() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', 'chart-popup ' + this.$theme.name + '-theme')

    this.date_text = document.createElement('div')
    this.date_text.setAttribute('class', 'chart-popup-date')

    this.div.appendChild(this.date_text)

    this.div_columns = document.createElement('div')
    this.div_columns.setAttribute('class', 'chart-popup-values')
    this.div.appendChild(this.div_columns)

    document.body.appendChild(this.div)

    this.div.addEventListener('webkitAnimationStart', () => {
      console.log(123);
      
    });
  }

  createColumnInfo(name, color, value) {
    let div = document.createElement('div')
    div.setAttribute('class', 'chart-popup-value')

    let count = document.createElement('div')      
    count.style.color = color
    count.setAttribute('class', 'chart-popup-value-count')
    count.innerText = value
    div.appendChild(count)

    let label = document.createElement('div')
    label.setAttribute('class', 'chart-popup-value-label')

    label.innerHTML = name
    div.appendChild(label)

    this.div_columns.appendChild(div)
  }

  createPopupData(index) {
    this.div_columns.innerHTML = null
    this.date_text.innerHTML = null
    
    for (let i = 0; i < this.$columns.length; i++) {
      if (!this.$hidden_columns.includes(i)) {
        let column = this.$columns[i]
        this.createColumnInfo(this.$names[column[0]], this.$colors[column[0]], column[index])
      }
    }

    let date = this.getDateByIndex(index)
    this.el1 = document.createElement('span')

    this.el1.innerText = date[0]
    this.date_text.appendChild(this.el1)

    this.el2 = document.createElement('span')
    this.el2.innerText = date[1]
    this.date_text.appendChild(this.el2)

    this.el3 = document.createElement('span')
    this.el3.innerText = date[2]
    this.date_text.appendChild(this.el3)

    this.el4 = document.createElement('span')
    this.el4.innerText = date[3]
    this.date_text.appendChild(this.el4)
  }

  animatePopupData(index) {
    let date = this.getDateByIndex(index)
    this.el1.innerText = date[0]
    this.el2.innerText = date[1]
    this.el3.innerText = date[2]
    this.el4.innerText = date[3]
  }

  getDateByIndex(index) {    
    let date = new Date(this.$dates[index])
    let day = this.$locale.day[date.getDay()]
    let d = date.getDate()
    let m = this.$locale.month[date.getMonth()]
    let y = date.getFullYear()

    return [day, d, m, y]
  }
}