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
         var max = 150;
         for (let i in json.columns) {
            // json.columns[i].splice(max, json.columns[i].length-1-max)
         }
         
         this.chart.setData(json);
      },
      locale(value) {         
         this.chart.setLocale(value);
      },
   },
   mounted() {
      this.chart = new LineChart(this.id, 670, 460, {locale: this.locale});
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
