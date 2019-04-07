<template>
<div class="container">
  <div class="row">
    <div class="col-12 col-md-9">
      <p>The graph does not use third-party libraries. All code is written from scratch.</p>
      <Chart :json="json[0]" ref="chart0" id="chart0" :locale="locale" :theme="theme" />
      <Chart :json="json[1]" ref="chart1" id="chart1" :locale="locale" :theme="theme" />
      <Chart :json="json[2]" ref="chart2" id="chart2" :locale="locale" :theme="theme" />
      <Chart :json="json[3]" ref="chart3" id="chart3" :locale="locale" :theme="theme" />
      <Chart :json="json[4]" ref="chart4" id="chart4" :locale="locale" :theme="theme" />
    </div>

    <div class="col-12 col-md-3">
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
  mounted() {
    this.axios.get('./chart_data.json').then((response) => {
      this.json = response.data;
    })
  },
  methods: {
    setTheme(value) {
      this.$refs.chart0.setTheme(value)
      this.$refs.chart1.setTheme(value)
      this.$refs.chart2.setTheme(value)
      this.$refs.chart3.setTheme(value)
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



.chart-checkbox {
  display:none;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 6px 20px 6px 40px;
    color: #fff;
    border-radius: 20px;
    margin-right: 20px;
    margin-top: 15px;
    font-weight: bold;
  }

  &:checked + label:after {
    content: '';
    position: absolute;
    left: 16px;
    top: 17px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
    transform: rotate(45deg) scale(1.2);
  }
}


.chart-popup {
  position: absolute;
  display: none;
  padding: 6px 14px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
  border-radius: 14px;
  width: 170px;

  &-date {
    font-size: 14px;
    font-weight: bold;
  }

  &-value {
    line-height: 24px;

    &-count {
      font-size: 14px;
      font-weight: bold;
      float: right;
    }
    &-label {
      font-size: 13px;
    }
  }
  
  &.default-theme {
    background: rgb(255, 255, 255);
  }
}
</style>