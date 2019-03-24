<template>
<div class="container">
  <div class="row">
    <div class="col-9">
      <h5>The graph does not use third-party libraries. All code is written from scratch.</h5>
      <Chart :json="json[0]" ref="chart0" id="chart0" :locale="locale" :theme="theme" />
      <!-- <Chart :json="json[1]" ref="chart1" id="chart1" :locale="locale" :theme="theme" />
      <Chart :json="json[2]" ref="chart2" id="chart2" :locale="locale" :theme="theme" />
      <Chart :json="json[3]" ref="chart3" id="chart3" :locale="locale" :theme="theme" />
      <Chart :json="json[4]" ref="chart4" id="chart4" :locale="locale" :theme="theme" /> -->
    </div>

    <div class="col-3">
      <Options ref="options" v-on:locale="(value) => locale = value" v-on:theme="setTheme" />
    </div>
  </div>
</div>
</template>

<script>
import Chart from './Chart.vue'
import Options from './Options.vue'

export default {
  components: {
    Chart,
    Options,
  },
  created() {
    this.axios.get('./chart_data.json').then((response) => {
      this.json = response.data;
    })
  },
  methods: {
    setTheme(value) {
      this.$refs.chart4.setTheme(value)
    }
  },
  data () {
    return {
      locale: LineChart.en,
      theme: {},
      json: []
    }
  }
}
</script>

<style lang="scss">
.container {
  margin-top: 50px;
}
</style>