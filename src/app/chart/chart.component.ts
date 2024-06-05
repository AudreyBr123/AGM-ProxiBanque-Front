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

  ngOnInit(): void {
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Client1', 'Client2', 'Client3'],
        datasets: [
          {
          label: 'Comptes courants',
          data: [1200, 1900, 3000],
          backgroundColor: [
            'rgba(26, 41, 128, 0.8)'
          ],
          borderWidth: 0
        },
        {
          label: 'Comptes épargnes',
          data: [5000, 2000, 3000],
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
          y: {
            beginAtZero: true,
            max: 5000,
            ticks: {
            }
          }
        }
      }
    });
    
  }

}
