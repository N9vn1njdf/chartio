import { Component } from 'core'

export default class Checkboxes extends Component {

  /**
   * @override
   */
  $onData({dates, columns, $colors, $names}) {
    this.show(columns[0].length-4)
  }

  /**
   * @override
   */
  $build(theme, locale) {
    this.id = this.$scaffold.id

    this.createPopup()
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

  createColumnInfo(index, value) {
    index = (index) >> 0
    if (this.$hidden_columns.includes(index)) {
       return
    }

    let div = document.createElement('div')
    div.setAttribute('class', 'chart-popup-value')

    let count = document.createElement('div')      
    count.style.color = this.$colors[this.$columns[index][0]]
    count.setAttribute('class', 'chart-popup-value-count')
    count.innerHTML = value
    div.appendChild(count)

    let label = document.createElement('div')
    label.setAttribute('class', 'chart-popup-value-label')

    label.innerHTML = this.$names[this.$columns[index][0]]
    div.appendChild(label)

    this.div_columns.appendChild(div)
  }

  show(column_index) {
    this.div_columns.innerHTML = null

    for (let i = 0; i < this.$columns.length; i++) {
      let column = this.$columns[i]
      
    }

    // for(let i in data) {
    //   data[i].alpha = 1
    //   let value = data[i].column_value
    //   this.createColumnInfo(i, value)
    // }

    this.date_text.innerHTML = this.getDateByIndex(column_index)
    this.div.style.display = 'block'
  }

  hidePopup() {      
    this.line.alpha = 0
    this.div.style.display = 'none'
    this.circles.children.forEach(circle => circle.alpha = 0)
  }

  getDateByIndex(column_index) {    
    let date = new Date(this.$dates[column_index])
    let day = this.$locale.day[date.getDay()]
    let d = date.getDate()
    let m = this.$locale.month[date.getMonth()]
    let y = date.getFullYear()

    return day + ', ' + d + ' ' + m + ' ' + y
  }
}