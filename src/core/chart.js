import Scaffold from "./scaffold";

export default class Chart {
   
   // static get ru() {
   //    return {
   //       month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
   //       day: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
   //    }
   // }

   // static get en() {
   //    return {
   //       month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   //       day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
   //    }
   // }

   constructor(id, width, height, locale, theme) {
      theme = this._calcTheme(theme)

      this.$created(theme, locale)
      
      this.scaffold = new Scaffold({
         id,
         width,
         height,
         theme,
         components: this.components
      })
   }

   setData(data) {      
      // this.map.setData({columns: data.columns, colors: data.colors, names: data.names});
      // this.checboxes.setData({columns: data.columns, colors: data.colors, names: data.names});
      this.scaffold.setData(data)
   }

   setTheme(theme) {
      // this.components.forEach(component => component.$theme(theme))
      // this.scaffold.setNeedUpdate('theme', true, 100)
      this.scaffold.canvas.style.background = theme.background
      this.scaffold.theme = this._calcTheme(theme)
   }

   _calcTheme(theme) {
      if (!theme) {
         theme = this.defaultTheme
      }

      for(let key in this.defaultTheme) {
         if (!theme[key]) {
            theme[key] = this.defaultTheme[key]
         }
      }

      return theme
   }

   setLocale(locale) {
      // this.localeObserver.broadcast(locale)
      this.scaffold.setNeedUpdate('locale', true, 100)
   }
}