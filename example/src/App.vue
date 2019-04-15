<template>
<div class="container">
  <div class="row">
    <div class="col-12 col-md-3 mt-n4">
      <Options ref="options" v-on:locale="(value) => locale = value" v-on:theme="setTheme" />
    </div>

    <div class="col-12 col-md-9 p-3">
      <p>К сожалению не успел сделать все графики, по личным причинам.</p>

      <p>В рамках конкурса был разработан специальный фреймворк, задача которого облегчить процесс создания графиков. Основной акцент при разработке делался на универсальность и скорость работы. В результате новый тип графика(bar) был создан менее чем за сутки, без влияния на производительность</p>

      <p>Его развитие я продолжу и после окончания конкурса. Поэтому просьба ознакомиться с репозиторием: </p>
      <a target="_blank" href="https://github.com/Zeratyll/chartio">https://github.com/Zeratyll/chartio</a>
    </div>

    <div class="col-12 col-md-9 p-0">
      <h4>Followers</h4>
      <Chart type="line" :data="json.line" ref="chart1" id="chart1" :locale="locale" :theme="theme"/>

      <h4>Messages</h4>
      <Chart type="bar" :data="json.messages" ref="chart2" id="chart2" :locale="locale" :theme="theme"/>

      <h4>Views</h4>
      <Chart type="bar" :data="json.views" ref="chart3" id="chart3" :locale="locale" :theme="theme"/>

      <!-- <h4>Chart 1</h4>
      <Chart type="line" :data="json_old[1]" ref="chart4" id="chart4" :locale="locale" :theme="theme" />
      <h4>Chart 2</h4>
      <Chart type="line" :data="json_old[2]" ref="chart5" id="chart5" :locale="locale" :theme="theme" />
      <h4>Chart 3</h4>
      <Chart type="line" :data="json_old[3]" ref="chart6" id="chart6" :locale="locale" :theme="theme" />
      <h4>Chart 4</h4>
      <Chart type="line" :data="json_old[4]" ref="chart7" id="chart7" :locale="locale" :theme="theme" /> -->
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
    this.axios.get('./data/1/overview.json').then((response) => {
      this.json.line = response.data;      
    })
    this.axios.get('./data/3/overview.json').then((response) => {
      this.json.messages = response.data;      
    })
    this.axios.get('./data/4/overview.json').then((response) => {
      this.json.views = response.data;      
    })
    // this.axios.get('./chart_data.json').then((response) => {
    //   this.json_old = response.data;      
    // })
  },
  methods: {
    setTheme(value) {
      if (value == 'darkTheme') {
        document.body.style.background = '#212e3b'
        document.body.style.color = '#fff'
      } else {
        document.body.style.background = '#fff'
        document.body.style.color = '#000'
      }

      this.$refs.chart1.setTheme(value)
      this.$refs.chart2.setTheme(value)
      this.$refs.chart3.setTheme(value)
      // this.$refs.chart4.setTheme(value)
      // this.$refs.chart5.setTheme(value)
      // this.$refs.chart6.setTheme(value)
      // this.$refs.chart7.setTheme(value)
    }
  },
  data () {
    return {
      locale: null,
      theme: {},
      json_old: {},
      json: {
        messages: null,
        views: null,
        line: null,
        area: null,
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
h4 {
  font-size: 19px;
  font-weight: bolder;
  margin: 40px 15px 15px;
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
    background: #fff;
  }
  &.dark-theme {
    background: #1c2532;
  }
}
</style>