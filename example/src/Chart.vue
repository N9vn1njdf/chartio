<template>
<div>
   <div :id="id"></div>
</div>
</template>

<script>
export default {
   props: {
      json: {
         required: true,
      },
      id: {
         required: true,
      },
      locale: {
         required: true,
      },
      theme: {
         required: true,
      }
   },
   watch: {
      json(json) {
         this.chart.setData(json);
      },
      locale(value) {         
         this.chart.setLocale(value);
      },
   },
   mounted() {
      let w = 380
      if (window.innerWidth < w) {
         w = window.innerWidth
      }

      this.chart = new LineChart(this.id, w, w*1.2, {locale: this.locale});
   },
   methods: {
      setTheme(value) {         
         this.chart.setTheme(value);
      },
   }
}
</script>

<style>

</style>
