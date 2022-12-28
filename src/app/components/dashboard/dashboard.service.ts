import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardDisplayData {
  numberOfOrphans: number;
  numberOfSponsors: number;
  numberOfFamilies: number;
}
export interface DashboardTableData {
  orphans: number;
  sponsors: number;
  families: number;
  isPaid: boolean;
  helpStartDate: string;
  WaisenpatenschaftFormel: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  public getDisplayData(): Observable<DashboardDisplayData> {
    return this.http.get<DashboardDisplayData>(
      'assets/dashboardDisplayData.json'
    );
  }
  public getTableData(): Observable<DashboardTableData[]> {
    return this.http.get<DashboardTableData[]>(
      'assets/dashboardTableData.json'
    );
  }
}
