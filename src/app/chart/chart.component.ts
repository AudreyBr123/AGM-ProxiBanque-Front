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
  // Soldes des comptes courants (données en dur pour le moment)
  data1 = [200, 90, 3000]

  // Soldes des comptes épargne (données en dur pour le moment)
  data2 = [4000, 2000, 3300]


  ngOnInit(): void {
    const getColor = (value: number, defaultColor: string): string => {
      return value < 100 ? 'rgba(226, 50, 72, 0.8)' : defaultColor;
    };

    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Audrey Boureau', 'Gwendal Breton', 'Marine Spaak'],
        datasets: [
          {
          label: 'Comptes courants',
          data: this.data1,
          backgroundColor: this.data1.map(value => getColor(value, 'rgba(26, 41, 128, 0.8)')),
          borderWidth: 0
        },
        {
          label: 'Comptes épargne',
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
        },
        plugins: {
          legend: {
              // Cette partie du code gère l'inversion de l'action de la légende (quand on clique sur Comptes Courants, ça n'affiche que les Comptes Courants)
              onClick: function(e, legendItem, legend) {
                const index = legendItem.datasetIndex;
                const oppositeIndex = (index == 1) ? 0 : 1;

                if (oppositeIndex != undefined) {
                  const ci = legend.chart;
                  if (ci.isDatasetVisible(oppositeIndex)) {
                      ci.hide(oppositeIndex);
                      legendItem.hidden = true;
                  } else {
                      ci.show(oppositeIndex);
                      legendItem.hidden = false;
                  }
                }
            }
          }
        }
      }
    });
    
  }
}
