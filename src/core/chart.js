import Scaffold from "./scaffold";

export default class Chart {

   constructor(id, width, height, locale, theme) {      
      theme = this._merge(theme, this.defaultTheme)
      locale = this._merge(locale, this.defaultLocale)
      
      this.scaffold = new Scaffold({id, width, height, theme, locale})

      this.$create(this.scaffold, theme, locale)
      this.scaffold.components = this.components
      this.$created(theme, locale)
   }

   $create(theme, locale) {}

   $created(theme, locale) {}

   setData(data) {      
      this.scaffold.setData(data)
   }

   setTheme(theme) {
      this.scaffold.setTheme(this._merge(theme, this.defaultTheme))
   }

   setLocale(locale) {
      this.scaffold.setLocale(this._merge(locale, this.defaultLocale))
   }

   _merge(obj1, obj2) {
      if (!obj1) {
         return obj2
      }
      
      for(let key in obj2) {
         if (!obj1[key]) {
            obj1[key] = obj2[key]
         }
      }
      return obj1
   }
}