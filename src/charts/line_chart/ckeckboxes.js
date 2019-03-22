
let css = ".container {\
   display: block;\
   position: relative;\
   padding-left: 35px;\
   margin-bottom: 12px;\
   cursor: pointer;\
   font-size: 22px;\
   user-select: none;\
   border: 1px solid;\
   width: 140px;\
 }\
 .container input {opacity: 0;z-index: -1;position: absolute;}\
 .checkmark {\
   position: absolute;\
   top: 0;\
   left: 0;\
   height: 25px;\
   width: 25px;\
   background-color: #eee;\
 }\
 .container:hover input ~ .checkmark {\
   background-color: #ccc;\
 }\
 .container input:checked ~ .checkmark {\
   background-color: #2196F3;\
 }\
 .checkmark:after {\
   content: '';\
   position: absolute;\
   display: none;\
 }\
 .container input:checked ~ .checkmark:after {\
   display: block;\
 }\
 .container .checkmark:after {\
   left: 9px;\
   top: 5px;\
   width: 5px;\
   height: 10px;\
   border: solid white;\
   border-width: 0 3px 3px 0;\
   -webkit-transform: rotate(45deg);\
   -ms-transform: rotate(45deg);\
   transform: rotate(45deg);\
 }"


 css = ".styled-checkbox {\
   position: absolute;\
   opacity: 0;\
 }\
 .styled-checkbox + label {\
   position: relative;\
   cursor: pointer;\
   padding: 0;\
 }\
 .styled-checkbox + label:before {\
   content: '';\
   margin-right: 10px;\
   display: inline-block;\
   vertical-align: text-top;\
   width: 20px;\
   height: 20px;\
   border: 1px solid;\
 }\
 .styled-checkbox:hover + label:before {\
   background: #f35429;\
 }\
 .styled-checkbox:checked + label:before {\
   background: #f35429;\
 }\
 .styled-checkbox:disabled + label {\
   color: #b8b8b8;\
   cursor: auto;\
 }\
 .styled-checkbox:disabled + label:before {\
   box-shadow: none;\
   background: #ddd;\
 }\
 .styled-checkbox:checked + label:after {\
   content: '';\
   position: absolute;\
   left: 5px;\
   top: 9px;\
   background: white;\
   width: 2px;\
   height: 2px;\
   box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;\
   transform: rotate(45deg);\
 }"

export default class Checkboxes {
   constructor(id, hiddenColumnsObserver) {
      this.hiddenColumnsObserver = hiddenColumnsObserver;

      let div = document.getElementById(id);
      this.ui = document.createElement('div');
      div.appendChild(this.ui);

      this.createStyle();
      this.update();
   }

   createStyle() {
      let head = document.head || document.getElementsByTagName('head')[0];
      let style = document.createElement('style');

      head.appendChild(style);

      if (style.styleSheet){
         // This is required for IE8 and below.
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

      let checbox = document.createElement('div');
      this.ui.appendChild(checbox);
   }

   hideColumn(index) {
      this.hiddenColumnsObserver.broadcast(['hide', index]);
   }

   showColumn(index) {
      this.hiddenColumnsObserver.broadcast(['show', index]);
   }
}