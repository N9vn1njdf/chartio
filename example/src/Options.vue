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

   <div class="block">
      <b>Custom theme</b>

      <div class="block-colors">
         <div id="color" class="item" :style="{background: themes.custom.background}" v-on:click="showPicker('background')"></div>
         <div id="color" class="item" :style="{background: themes.custom.map_color1}" v-on:click="showPicker('map_color1')"></div>
         <div id="color" class="item" :style="{background: themes.custom.map_color2}" v-on:click="showPicker('map_color2')"></div>
         <div id="color" class="item" :style="{background: themes.custom.line_color1}" v-on:click="showPicker('line_color1')"></div>
         <div id="color" class="item" :style="{background: themes.custom.line_color2}" v-on:click="showPicker('line_color2')"></div>
         <div id="color" class="item" :style="{background: themes.custom.text_color1}" v-on:click="showPicker('text_color1')"></div>
         <div id="color" class="item" :style="{background: themes.custom.text_color2}" v-on:click="showPicker('text_color2')"></div>
         <div id="color" class="item" :style="{background: themes.custom.text_color3}" v-on:click="showPicker('text_color3')"></div>
      </div>


      <div class="form-group">
         <label>Map edge width</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.map_edge_width">
      </div>

      <div class="form-group">
         <label>Map padding top</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.map_padding_top">
      </div>

      <div class="form-group">
         <label>Map padding bottom</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.map_padding_bottom">
      </div>

      <div class="form-group">
         <label>Font family</label>
         <input type="text" class="form-control form-control-sm" v-model="themes.custom.font_family">
      </div>

      <div class="form-group">
         <label>Text size 1</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.text_size1">
      </div>

      <div class="form-group">
         <label>Text size 2</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.text_size2">
      </div>
      
      <div class="form-group">
         <label>Text size 3</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.text_size3">
      </div>

      <div class="form-group">
         <label>Lines count</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.lines_count">
      </div>

      <div class="form-group">
         <label>Animation duration 1</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.animation_duration_1">
      </div>

      <div class="form-group">
         <label>Animation duration 2</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.animation_duration_2">
      </div>

      <div class="form-group">
         <label>Animation duration 3</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.animation_duration_3">
      </div>

      <div class="form-group">
         <label>Animation duration 4</label>
         <input type="number" class="form-control form-control-sm" v-model="themes.custom.animation_duration_4">
      </div>

      <button class="btn btn-success" v-on:click="setTheme('custom')">Accept</button>
   </div>

   <div v-click-outside="onClickOutside" class="picker" v-show="picker">
      <chrome-picker :value="color" @input="updateValue"/>
   </div>
</div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
   components: {
      'chrome-picker': Chrome,
   },
   methods: {
      setLocale(locale) {
         this.locale = locale;
         this.$emit('locale', LineChart[locale]);
      },
      setTheme(theme) {
         this.theme = theme;
         this.$emit('theme', this.themes[theme]);
      },
      showPicker(name) {
         this.color = this.themes.custom[name]
         this.picker = name;
      },
      onClickOutside(event, el) {
         if (event.target.id != 'color') {
            this.picker = null;
         }
      },
      updateValue(e) {         
         let value = e.rgba;
         let string = `rgba(${value.r},${value.g},${value.b},${value.a})`
         this.themes.custom[this.picker] = string
      }
   },
   data() {
      return {
         picker: null,
         color: {},
         locale: 'en',
         theme: 'day',
         themes: {
            day: {},
            night: {
               background: '#1e2a38',
               map_color1: 'rgba(205, 211, 236, 0.1)',
               map_color2: 'rgba(212, 220, 244, 0.2)',
               line_color1: '#293443',
               line_color2: '#3b4a59',
               text_color1: '#546777',
               text_color2: '#546777',
               text_color3: '#fff'
            },
            custom: {
               background: '#2e3337',
               map_color1: 'rgba(205, 211, 236, 0.4)',
               map_color2: 'rgba(212, 220, 244, 0.28)',
               map_edge_width: 4,
               map_padding_top: 5,
               map_padding_bottom: 5,
               font_family: 'Arial',
               text_color1: 'red',
               text_size1: 12.5,
               text_color2: 'red',
               text_size2: 12,
               text_color3: '#000',
               text_size3: 14,
               line_color1: 'rgba(255, 255, 255, 0.1)',
               line_color2: 'rgba(255, 255, 255, 0.1)',
               lines_count: 5,
               animation_duration_1: 260,
               animation_duration_2: 260,
               animation_duration_3: 200,
               animation_duration_4: 220,
            }
         }
      }
   }
}
</script>

<style lang="scss">
.picker {
   position: absolute;
   top: 226px;
}

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

   &-colors {
      width: 100%;
      height: 34px;

      & .item {
         float: left;
         width: 20px;
         height: 20px;
         border-radius: 100%;
         margin-right: 6px;
         cursor: pointer;
         opacity: 0.6;
         border: 1px solid #000;

         &:hover {
            opacity: 1;
         }
      }
   }

   & > b {
      line-height: 32px;
   }

   & label {
      font-size: 14px;
      margin: 0px;
   }
}
</style>
