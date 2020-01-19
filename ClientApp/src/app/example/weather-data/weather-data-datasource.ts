import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface WeatherDataItem {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


// TODO: replace this with real data from your application
const EXAMPLE_DATA: WeatherDataItem[] = [
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

/**
 * Data source for the WeatherData view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class WeatherDataDataSource extends DataSource<WeatherDataItem> {
  data: WeatherDataItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<WeatherDataItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: WeatherDataItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WeatherDataItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'temperatureC': return compare(+a.temperatureC, +b.temperatureC, isAsc);
        case 'temperatureF': return compare(+a.temperatureF, +b.temperatureF, isAsc);
        case 'summary': return compare(+a.summary, +b.summary, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
