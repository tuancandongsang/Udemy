import React from "react";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);
// LineChart
class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.label);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'line',
        options: {
          maintainAspectRatio: false,
          scales: {

          }
        },
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            fill: 'none',
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            tension: 0.4,
            borderWidth: 3, 
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
  }
  export default LineChart