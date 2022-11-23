
<template>
  <div class="container">
    <Bar v-if="loaded" :chart-data="chartData" :options="options" />
  </div>
</template>
  
<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "BarChart",
  components: { Bar },
  data: () => ({
    loaded: true,
    // chartData: null,
    chartData: {
      label: "Data One",
      labels: ["React", "VueJs", "Nuxt", "tuan", "nga"],
      datasets: [
        {
          label: "TuancanDongSang",
          data: [30, 40, 25, 20, 17],
          backgroundColor: ["#f87979", "red", "green", "blue", "yellow"],
          borderWidth: 2,
          // borderColor: "tomato",
          hoverBorderColor: "brown",
        },
      ],
    },

    options: {
      title: {
        display: true,
        text: "tuancandongsang",
      },
      legend: {
        position: "right",
      },
    },

    chartOptions: {
      responsive: true,
    },
  }),
  created() {
    // this.loaded = false
    // try {
    //     const userlist = await axios.get('https://jsonplaceholder.typicode.com/users')
    //     console.log(userlist.data);
    //     this.chartData.datasets[0].data = this.tranfromdataID(userlist.data)
    //     this.chartData.labels = this.tranfromdataName(userlist.data)
    //     console.log(this.tranfromdataName(userlist.data));
    //     this.loaded = true
    // } catch (e) {
    //     console.error(e)
    // }
  },
  methods: {
    tranfromdataID(arr) {
      return arr.map((item) => item.id); 
    },
    tranfromdataName(arr) {
      return arr.map((item) => item.name);
    },
  },
};
</script>
<style scoped>
.container {
  width: 1000px;
}
</style>