<template>
<div class="container-fluid">
  <div class="row">

    <div class="col-9">
      <h5>The graph does not use third-party libraries. All code is written from scratch.</h5>
      <Chart
        ref="demo"
        id="demo"
        :locale="locale"
        :theme="theme"
      />
    </div>

    <div class="col-3">
      <Options
        ref="options"
        v-on:locale="(value) => locale = value"
        v-on:theme="(value) => $refs.demo.setTheme(value)"
      />
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
  data () {
    return {
      locale: LineChart.en,
      theme: {},
    }
  }
}
</script>

<style lang="scss">
.container {
  margin-top: 50px;
}
</style>