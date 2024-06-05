import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  @ViewChild('myChart', { static: true }) myChart!: ElementRef;

  constructor() {}
  data1 = [200, 90, 3000]
  data2 = [4000, 2000, 3000]


  ngOnInit(): void {
    const getColor = (value: number, defaultColor: string): string => {
      return value < 100 ? 'rgba(226, 50, 72, 0.8)' : defaultColor;
    };

    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Client1', 'Client2', 'Client3'],
        datasets: [
          {
          label: 'Comptes courants',
          data: this.data1,
          backgroundColor: this.data1.map(value => getColor(value, 'rgba(26, 41, 128, 0.8)')),
          borderWidth: 0
        },
        {
          label: 'Comptes épargnes',
          data: this.data2,
          backgroundColor: [
            'rgba(38, 208, 206, 0.8)'
          ],
          borderWidth: 0
        },
      ]
      },

      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 4500,
            ticks: {
            }
          }
        }
      }
    });
    
  }

}
