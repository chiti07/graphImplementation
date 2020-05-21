import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { __importDefault } from 'tslib';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

    
  Highcharts = Highcharts;
  chartOptions = {};

  private intervalUpdate: any = null;
  public chart: any = null;



  constructor(private http: HttpClient) { }

  /**
 * Print the data to the chart
 * @function showData
 * @return {void}
 */
 private showData(): void {
  this.getFromAPI().subscribe(response => {
    if(response.error === false) {
      let chartTime: any = new Date();
      chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
      if(this.chart.data.labels.length > 30) {
          this.chart.data.labels.shift();
          this.chart.data.datasets[0].data.shift();
      }
      this.chart.data.labels.push(chartTime);
      this.chart.data.datasets[0].data.push(response.data);
      this.chart.update();
    } else {
      console.error("ERROR: The response had an error, retrying");
    }
  }, error => {
    console.error("ERROR: Unexpected response");
  });
}
 
/**
* Get the data from the API
* @function getFromAPI
* @return {Observable<any>}
*/
private getFromAPI(): Observable<any>{
  return this.http.get(
     'http://localhost:3000',
     { responseType: 'json' }
  );
}

  ngOnInit(): void {
    this.chart = new Chart('realtime', {
      type: 'line',
      data: {
       labels: [],
       datasets: [
         {
        label: 'Data',
        fill: false,
        data: [],
        backgroundColor: '#168ede',
        borderColor: '#168ede'
         }
       ]
        },
        options: {
       tooltips: {
        enabled: false
       },
       legend: {
        display: true,
        position: 'bottom',
        labels: {
         fontColor: 'white'
        }
       },
       scales: {
         yAxes: [{
          ticks: {
           fontColor: "white"
          }
         }],
         xAxes: [{
        ticks: {
         fontColor: "white",
         beginAtZero: true
        }
         }]
       }
        }
     });

     this.intervalUpdate = setInterval(function(){
      this.showData();
     }.bind(this), 10000);

    }

  private ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
   }




}
