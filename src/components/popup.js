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

    this.index = index

    // Позиционирование попапа
    let y = this.$canvas.offsetTop + this.$scaffold.input.y - 20
    let x = this.$scaffold.input.pageX + 20
        
    if (x + this.div.offsetWidth + 80 > this.$canvas.width) {
      x = this.$scaffold.input.pageX - 20 - this.div.offsetWidth
    } else if (x < 0) {
      x = 0
    }

    this.div.style.display = 'block'
    this.div.style.top = y + 'px'
    this.div.style.left = x + 'px'
  }

  hide() {      
    this.div.style.display = 'none'
    this.index = null
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
  }

  createColumnInfo(name, color, value) {
    if (!this.slide_count) {
      this.slide_count = {}
    }

    let div = document.createElement('div')
    div.setAttribute('class', 'chart-popup-value')

    let count = document.createElement('div')      
    count.style.color = color
    count.setAttribute('class', 'chart-popup-value-count')
    this.slide_count[name] = new SlideText(value, count)
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
    this.slide_date = new SlideText(`${date[0]}, ${date[1]} ${date[2]} ${date[3]}`, this.date_text)
  }

  animatePopupData(index) {
    let date = this.getDateByIndex(index)
    this.slide_date.animateTo(`${date[0]}, ${date[1]} ${date[2]} ${date[3]}`, this.index < index ? 'bottom' : 'top')

    for (let i = 0; i < this.$columns.length; i++) {
      if (!this.$hidden_columns.includes(i)) {
        let column = this.$columns[i]
        let name = this.$names[column[0]]
        let value = column[index]
        this.slide_count[name].animateTo(value, this.index < index ? 'bottom' : 'top')
      }
    }
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