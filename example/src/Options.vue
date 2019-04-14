<template>
<div class="options">
   <h5>Settings</h5>

   <div class="block">
      <b>Language</b>
      <div class="float-right btn-group btn-group-sm" role="group" aria-label="Basic example">
         <button class="btn btn-info" :class="{focus: locale == 'ru'}" v-on:click="setLocale('ru')">Ru</button>
         <button class="btn btn-info" :class="{focus: locale == 'en'}" v-on:click="setLocale('en')">En</button>
      </div>
   </div>

   <div class="block">
      <b>Theme</b>
      <div class="float-right btn-group btn-group-sm" role="group" aria-label="Basic example">
         <button class="btn btn-light" :class="{focus: theme == 'day'}" v-on:click="setTheme('day')">Day</button>
         <button class="btn btn-dark" :class="{focus: theme == 'night'}" v-on:click="setTheme('night')">Night</button>
      </div>
   </div>
</div>
</template>

<script>
export default {
   methods: {
      setLocale(locale) {
         this.locale = locale;
         this.$emit('locale', LineChart[locale]);
      },
      setTheme(theme) {
         this.theme = theme;
         this.$emit('theme', this.themes[theme]);
      },
   },
   data() {
      return {
         locale: 'en',
         theme: 'default',
         themes: {
            day: {},
            night: {
               name: 'night',
               background: '#1e2a38',
               map_color1: 'rgba(205, 211, 236, 0.1)',
               map_color2: 'rgba(212, 220, 244, 0.2)',
               line_color1: '#293443',
               line_color2: '#3b4a59',
               text_color1: '#546777',
               text_color2: '#546777',
               text_color3: '#fff'
            },
         }
      }
   }
}
</script>

<style lang="scss">
.options {
   min-height: 100px;
   padding: 14px;
   border-radius: 4px;
   border: 1px solid #dadada;
}
.block {
   margin: 20px 0;
   display: table;
   width: 100%;

   & > b {
      line-height: 32px;
   }

   & label {
      font-size: 14px;
      margin: 0px;
   }
}
</style>
