import { Component, OnInit } from '@angular/core';
import {
  DashboardDisplayData,
  DashboardService,
  DashboardTableData,
} from './dashboard.service';
import { take } from 'rxjs';

@Component({
  selector: 'Sponsorship-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public displayData: DashboardDisplayData;
  public tableData: DashboardTableData[];

  public currentPageNumber: number = 1;
  public dashboardFilterTerm: string = '';

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService
      .getDisplayData()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.displayData = response;
        },
        error: (error) => {
          console.error(error);
        },
      });

    this.dashboardService
      .getTableData()
      .pipe(take(1))
      .subscribe({
        next: (response: DashboardTableData[]) => {
          this.tableData = [...response];
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
