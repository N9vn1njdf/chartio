let css = `
.styled-checkbox {display:none;}
.styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 8px 20px 8px 10px;
  border: 1.2px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 15px;
}
.styled-checkbox:hover + label:before {
  background: rgba(0, 0, 0, 0.05);
}
.styled-checkbox + label:before {
  content: '';
  margin-right: 12px;
  display: inline-block;
  vertical-align: text-top;
  width: 24px;
  height: 24px;
  border: 1px solid;
  border-radius: 100%;
  margin-top: -3px;
}
.styled-checkbox:checked + label:after {
  content: '';
  position: absolute;
  left: 16px;
  top: 19px;
  background: white;
  width: 2px;
  height: 2px;
  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
  transform: rotate(45deg) scale(1.2);
}`

export default class Checkboxes {
  constructor(id, hiddenColumnsObserver) {
    this.id = id;
    this.hidden_columns = [];
    this.hiddenColumnsObserver = hiddenColumnsObserver;
    
    let div = document.getElementById(id);
    this.ui = document.createElement('div');
    div.appendChild(this.ui);

    this.createStyle(css);
   }

  createStyle(css) {
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    head.appendChild(style);

    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
  }

  setData({columns, colors, names}) {
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

    let checbox = document.createElement('input');
    checbox.setAttribute('type', 'checkbox');
    checbox.setAttribute('checked', 'true');
    checbox.setAttribute('id', id);
    checbox.setAttribute('class', 'styled-checkbox ');
    checbox.addEventListener('change', () => this.toggleColumn(index));

    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = text;

    this.ui.appendChild(checbox);
    this.ui.appendChild(label);

    let css = `
      #${id}.styled-checkbox + label:before {
        border-color: ${color};
      }
      #${id}.styled-checkbox:checked + label:before {
        background: ${color};
      }
    `;
    this.createStyle(css);
  }

  toggleColumn(index) {
    if (this.hidden_columns.includes(index)) {
      this.hiddenColumnsObserver.broadcast(['show', index]);
      
      for(let i in this.hidden_columns) {
        if (this.hidden_columns[i] == index) {
          this.hidden_columns.splice(i, 1);
        }
      }
    } else {
      this.hidden_columns.push(index);
      this.hiddenColumnsObserver.broadcast(['hide', index]);
    }
    
    if (this.columns.length - 1 - this.hidden_columns.length == 1) {
      let left_index;
      for (let i = 1; i < this.columns.length; i++) {        
        if (!this.hidden_columns.includes(i-1)) {          
          left_index = i-1
        }
      }

      let id = 'column_' + left_index + '_' + this.id;
      let checbox = document.getElementById(id);
      checbox.setAttribute('disabled', true)

    } else {
      for (let i = 1; i < this.columns.length; i++) {        
        let id = 'column_' + (i-1) + '_' + this.id;        
        let checbox = document.getElementById(id);
        checbox.removeAttribute('disabled')
      }
    }
  }
}