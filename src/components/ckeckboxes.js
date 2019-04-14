import { Component } from 'core'

export default class Checkboxes extends Component {

  /**
   * @override
   */
  $onData({dates, columns, $colors, $names}) {
    this.ui.innerHTML = ''

    for (let i = 0; i < this.$columns.length; i++) {
      const column = this.$columns[i]
      this.createCheckbox(i, this.$names[column[0]], this.$colors[column[0]])
    }
  }

  /**
   * @override
   */
  $build(theme, locale) {
    this.id = this.$scaffold.id

    this.ui = document.createElement('div')
    this.ui.setAttribute('class', 'chart-checkboxes')
    document.getElementById(this.id).appendChild(this.ui)
  }

  createCheckbox(index, text, color) {
    let id = 'column_' + index + '_' + this.id

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('checked', 'true')
    checkbox.setAttribute('id', id)
    checkbox.setAttribute('class', 'chart-checkbox')
    checkbox.addEventListener('change', (e) => this.toggleColumn(e, index))

    let label = document.createElement('label')
    label.setAttribute('for', id)
    label.innerText = text
    label.style.background = color

    this.ui.appendChild(checkbox)
    this.ui.appendChild(label)
  }

  toggleColumn(e, index) {    
    if (e.target.checked) {
      this.$showColumn(index)
    } else {      
      this.$hideColumn(index)
    }
  }
}