import { Component } from 'core'

export default class Checkboxes extends Component {

  constructor(id) {
    super()

    this.id = id;
    this.hidden_columns = [];

    let div = document.getElementById(id);
    this.ui = document.createElement('div');
    div.appendChild(this.ui);
  }

  $onData({columns, colors, names}) {
    this.columns = columns;
    this.colors = colors;
    this.names = names;    
    this.update();
  }

  update() {
    this.ui.innerHTML = '';

    for (let i = 1; i < this.columns.length; i++) {
      const column = this.columns[i];
      this.createCheckbox(i-1, this.names[column[0]], this.colors[column[0]])
    }
  }

  createCheckbox(index, text, color) {
    let id = 'column_' + index + '_' + this.id;

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('checked', 'true');
    checkbox.setAttribute('id', id);
    checkbox.setAttribute('class', 'chart-checkbox');
    checkbox.addEventListener('change', () => this.toggleColumn(index));

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = text;
    label.style.background = color

    this.ui.appendChild(checkbox);
    this.ui.appendChild(label);
  }

  toggleColumn(index) {
    if (this.hidden_columns.includes(index)) {
      this.$showColumn(index)

      for(let i in this.hidden_columns) {
        if (this.hidden_columns[i] == index) {
          this.hidden_columns.splice(i, 1);
        }
      }
    } else {      
      this.hidden_columns.push(index);
      this.$hideColumn(index)
    }

    
    
    if (this.columns.length - 1 - this.hidden_columns.length == 1) {
      let left_index;
      for (let i = 1; i < this.columns.length; i++) {        
        if (!this.hidden_columns.includes(i-1)) {          
          left_index = i-1
        }
      }

      let id = 'column_' + left_index + '_' + this.id;
      let checkbox = document.getElementById(id);
      checkbox.setAttribute('disabled', true)

    } else {
      for (let i = 1; i < this.columns.length; i++) {        
        let id = 'column_' + (i-1) + '_' + this.id;        
        let checkbox = document.getElementById(id);
        checkbox.removeAttribute('disabled')
      }
    }
  }
}