import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  constructor(private http: HttpClient) {}

  addSponsor(data: any) {
    return this.http.post('https://api.sponsorship.com/api/sponsor', data);
  }

  getSponsorData() {
    return this.http.get('assets/SponsorsList.json');
  }
}
