import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WeatherDataDataSource } from './weather-data-datasource';
import { WeatherDataService, WeatherDataItem } from '../services/weather-data.service';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css'],
})
export class WeatherDataComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<WeatherDataItem>;
  dataSource: WeatherDataDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'temperatureC', 'temperatureF', 'summary'];

  constructor(private weatherDataService: WeatherDataService) {
  }

  ngOnInit() {
    let data = this.weatherDataService.fetchWeatherData().subscribe(
      result => {
        this.dataSource = new WeatherDataDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error => { console.error(error) }
    );
  }

  ngAfterViewInit() {
    
  }
}
