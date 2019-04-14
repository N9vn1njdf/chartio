<template>
<div class="container">
  <div class="row">
    <div class="col-12 col-md-9 p-0">
      <p>The graph does not use third-party libraries. All code is written from scratch.</p>

      <Chart type="bar" :data="json.bar" ref="chart0" id="chart0" :locale="locale" :theme="theme"/>
      <!-- <Chart :json="json[1]" ref="chart1" id="chart1" :locale="locale" :theme="theme" />
      <Chart :json="json[2]" ref="chart2" id="chart2" :locale="locale" :theme="theme" />
      <Chart :json="json[3]" ref="chart3" id="chart3" :locale="locale" :theme="theme" />
      <Chart :json="json[4]" ref="chart4" id="chart4" :locale="locale" :theme="theme" /> -->
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
    this.axios.get('./data/4/overview.json').then((response) => {
      this.json.bar = response.data;      
    })
  },
  methods: {
    setTheme(value) {
      this.$refs.chart0.setTheme(value)
      // this.$refs.chart1.setTheme(value)
      // this.$refs.chart2.setTheme(value)
      // this.$refs.chart3.setTheme(value)
      // this.$refs.chart4.setTheme(value)
    }
  },
  data () {
    return {
      locale: null,
      theme: {},
      json: {
        bar: null
      }
    }
  }
}
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}
.container {
  margin-top: 50px;
}
p {
  font-size: 14px;
}


.chart-checkboxes {
  padding-left: 20px;
}

.chart-checkbox {
  display:none;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 6px 20px 6px 40px;
    color: #fff;
    border-radius: 20px;
    margin-right: 8px;
    margin-top: 10px;
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
  width: 150px;

  &-date {
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    display: table;
    
    & > span {
      padding-right: 5px;
      display: block;
      float: left;

      &:first-child {
        margin-right: -6px;
      }
    }
  }

  &-value {
    line-height: 24px;

    &-count {
      font-size: 14px;
      font-weight: bold;
      float: right;

      & .text-animation > span {
        right: 0;
      }
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