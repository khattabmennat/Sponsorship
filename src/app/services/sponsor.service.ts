import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../models/sponsor';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class SponsorService extends BaseService {
  
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Add new sponsor entry in the database
   */
  addSponsor(data: Sponsor) {    
    return this.http.post(this.baseUrl +  'addsponsor', data)
                    .pipe(catchError(this.handleError));;
  }

  /**
   * Get a list of sponsors
   * @returns 
   */
  getSponsorData():Observable<Sponsor[]>{
    return this.http.get<Sponsor[]>(this.baseUrl +'getsponsors')
                    .pipe(catchError(this.handleError));
  }

   /**
   * Get a list of sponsors
   * @returns 
   */
    getSponsorDataById(sponsorid: number):Observable<Sponsor>{
      return this.http.get<Sponsor>(this.baseUrl +'getsponsorbyid?id=' + sponsorid )
                      .pipe(catchError(this.handleError));;
    }

  /**
   * Updates existing entry
   * @param data 
   * @returns 
   */
  updateSponsor(data: any) {
    return this.http.post(this.baseUrl +  'updatesponsor', data);
  }

  /**
   * Updates existing entry
   * @param data 
   * @returns 
   */
   deleteSponsor(sponsorId: number) {
    return this.http.delete(this.baseUrl +  'deletesponsor?sponsorid=' + sponsorId)
    .subscribe({
      error: error => {
          console.error('There was an error!', error);
      }
  });
  }
}
