import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'area'
      },
      title: {
          text: 'Car Speed'
      },
      subtitle: {
          text: 'DEMO'
      },
      tooltip:{
        split:true,
        valueSuffix: 'km/h'
      },
      credits:{
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      series: [{
          name: 'Speed',
          data: [0, 10,50,30,20, 60,80, 20, 15,50,40,60, 65,80, 85, 85, 90,95,95,95, 95, 10,30,20, 60,80]
      } 
      ]
  };

  HC_exporting(Highcharts);

  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }

}
