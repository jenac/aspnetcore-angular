import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherDataItem {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) { }

  private EXAMPLE_DATA: WeatherDataItem[] = [
    {date: '2020-01-01', temperatureC: 21, temperatureF: 51, summary: 'Hydrogen'},
    {date: '2020-01-02', temperatureC: 22, temperatureF: 52, summary: 'Helium'},
    {date: '2020-01-03', temperatureC: 23, temperatureF: 53, summary: 'Lithium'},
    {date: '2020-01-04', temperatureC: 24, temperatureF: 54, summary: 'Beryllium'},
    {date: '2020-01-05', temperatureC: 25, temperatureF: 55, summary: 'Boron'},
    {date: '2020-01-06', temperatureC: 26, temperatureF: 56, summary: 'Carbon'},
    {date: '2020-01-07', temperatureC: 27, temperatureF: 57, summary: 'Nitrogen'},
    {date: '2020-01-08', temperatureC: 28, temperatureF: 58, summary: 'Oxygen'},
    {date: '2020-01-09', temperatureC: 29, temperatureF: 59, summary: 'Fluorine'},
    {date: '2020-01-10', temperatureC: 30, temperatureF: 60, summary: 'Neon'},
    {date: '2020-01-11', temperatureC: 31, temperatureF: 61, summary: 'Sodium'},
    {date: '2020-01-12', temperatureC: 32, temperatureF: 62, summary: 'Magnesium'},
    {date: '2020-01-13', temperatureC: 33, temperatureF: 63, summary: 'Aluminum'},
    {date: '2020-01-14', temperatureC: 34, temperatureF: 64, summary: 'Silicon'},
    {date: '2020-01-15', temperatureC: 35, temperatureF: 65, summary: 'Phosphorus'},
    {date: '2020-01-16', temperatureC: 36, temperatureF: 66, summary: 'Sulfur'},
    {date: '2020-01-17', temperatureC: 37, temperatureF: 67, summary: 'Chlorine'},
    {date: '2020-01-18', temperatureC: 38, temperatureF: 68, summary: 'Argon'},
    {date: '2020-01-19', temperatureC: 39, temperatureF: 69, summary: 'Potassium'},
    {date: '2020-01-20', temperatureC: 40, temperatureF: 70, summary: 'Calcium'},
  ];
  
  fetchWeatherData(): Observable<WeatherDataItem[]>  {
    return this.http.get<WeatherDataItem[]>(this.baseUrl + 'weatherforecast');
  }
}


// constructor() {
//   http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
//     this.forecasts = result;
//   }, error => console.error(error));
// }