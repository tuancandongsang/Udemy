<template>
  <div>
    <h2>- là 1 thư viện vẽ biểu đồ, được build trên HTML5 canvas</h2>
    <p>
      <b>cài đặt: </b> yarn add vue-chartjs chart.js or npm install vue-chartjs chart.js --save <br>
      <b>hoặc cdn: </b> <br>
      script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"> script <br>
      script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"> script <br>


    </p>

    <div>
      <h1>khai báo ở local - BarChart</h1>
      <div class="chart-style-plugins">
        <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
          :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
      </div>
    </div>

    <h1>khai báo ở global - LineChart</h1>
    <div class="chart-container">
      <div class="chart-item">
        <p>
          <b>B1:</b> tạo plugins <br>
          <b>B2:</b> lập 1 file <b>chart.js</b> bên trong ghi nội dung <br>
          <img src="../../access/77.png" alt="">
        </p>
      </div>
      <div class="chart-item1">
        <p>
          <b>B3:</b> ở file nuxt.config.js <br>
          <img src="../../access/78.png" alt=""> <br>
          <br>
          <B>B4</B> sau đó ta có thể dử dụng ở cấp độ toàn cục mà k cần import <br>
          <img src="../../access/79.png" alt=""> <br>
        </p>
        <div class="chart-style-plugins">
          <h3>Thành quả</h3>
          <line-chart :chart-options='chartOptions' :chart-data='chartData' chart-id='chartId' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      chartData: {
        label: 'Data One',
        labels: ['React', 'VueJs', 'Nuxt'],
        datasets: [{
          label: 'TuancanDongSang',
          data: [30, 40, 25],
          backgroundColor: '#f87979',
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  head() {
    return {
      title: "ChartJs",
    };
  },
}
</script>

<style>
.chart-container {
  display: flex;
}

.chart-item1 {
  margin-left: 20px;
}

.chart-style-plugins {
  width: 400px;
}
</style>