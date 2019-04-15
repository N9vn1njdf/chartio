<template>
<div>
   <div :id="id"></div>
</div>
</template>

<script>
export default {
   props: {
      type: {
         required: true
      },
      data: {
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
      data(data) {         
         this.chart.setData(data);
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

      switch(this.type) {
         case 'bar':
            this.chart = new BarChart(this.id, w, w*1.2)
            break;
         case 'line':
            this.chart = new LineChart(this.id, w, w*1.2)
            break;
         case 'area':
            this.chart = new AreaChart(this.id, w, w*1.2)
            break;
      }
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
