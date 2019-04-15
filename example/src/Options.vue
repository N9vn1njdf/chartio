<template>
<div class="options" :class="theme">
   <h5>Settings</h5>

   <div class="block">
      <b>Language</b>
      <div class="float-right btn-group btn-group-sm" role="group" aria-label="Basic example">
         <button class="btn btn-info" :class="{focus: locale == 'ruLocale'}" v-on:click="setLocale('ruLocale')">Ru</button>
         <button class="btn btn-info" :class="{focus: locale == 'defaultLocale'}" v-on:click="setLocale('defaultLocale')">En</button>
      </div>
   </div>

   <div class="block">
      <b>Theme</b>
      <div class="float-right btn-group btn-group-sm" role="group" aria-label="Basic example">
         <button class="btn btn-light" :class="{focus: theme == 'defaultTheme'}" v-on:click="setTheme('defaultTheme')">Day</button>
         <button class="btn btn-dark" :class="{focus: theme == 'darkTheme'}" v-on:click="setTheme('darkTheme')">Night</button>
      </div>
   </div>
</div>
</template>

<script>
export default {
   methods: {
      setLocale(locale) {
         this.locale = locale;
         this.$emit('locale', locale);
      },
      setTheme(theme) {
         this.theme = theme
         this.$emit('theme', theme)
      },
   },
   data() {
      return {
         locale: 'defaultLocale',
         theme: 'defaultTheme',
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

   &.darkTheme {
      border-color: rgba(255, 255, 255, 0.1);
   }
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
