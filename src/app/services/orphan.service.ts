import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

import { BaseService } from './BaseService';
import { Family } from '../models/family';
import { familywithorphans } from '../models/familywithorphans';


@Injectable({
  providedIn: 'root'
})
export class FamilyService  extends BaseService
{
 
  constructor(private http: HttpClient) {super();}
  
  public lang = localStorage.getItem('lang')||'';

  public selectedLang = new BehaviorSubject<string>(this.lang);
 
  /**
 * Get a list of Orphans
 * @returns 
 */
    getFamilyList():Observable<Family[]>{
      //return this.http.get<Orphan[]>("assets/usersData.json")
        return this.http.get<Family[]>(this.baseUrl +'getfamillylist')
                        .pipe(catchError(this.handleError));
    }

    /**
   * Get Orphan item by Id
   * @returns 
   */
    getFamilyDataById(sponsorid: number):Observable<Family>{
        return this.http.get<Family>(this.baseUrl +'getfamillybyid?id=' + sponsorid )
                        .pipe(catchError(this.handleError)); 
    }

        /**
   * Get Family item with Kids by Id
   * @returns 
   */
    getFamilyWithOrphanDataById(familyId: number):Observable<familywithorphans>{
          return this.http.get<familywithorphans>(this.baseUrl +'getfamillywithKidsbyid?id=' + familyId )
                     .pipe(catchError(this.handleError)); 
    }

  /**
   * Add new orphan entry in the database
   */
    addFamilly(data: Family) {    
        return this.http.post(this.baseUrl +  'addfamilly', data)
                        .pipe(catchError(this.handleError));
    }

  /**
   * Updates existing entry
   * @param data 
   * @returns 
   */
    updateFamily(data: Family) {
        return this.http.put(this.baseUrl +  'updatefamily', data)
                   .pipe(catchError(this.handleError));
    }

  /**
   * Updates existing entry
   * @param data 
   * @returns 
   */
   deleteFamily(orphanId: number) {
      return this.http.delete(this.baseUrl +  'deletefamily?famillieId=' + orphanId)
                .subscribe({
                    error: error => {
                        console.error('There was an error!', error);
                    }
                });
    }
  
  getLang() {
    return this.selectedLang.asObservable();
  }
  get() {
    return this.http.get(`assets/i18n/${this.selectedLang.value}.json`);
  }
  setLang(lang: string) {
    this.selectedLang.next(lang);
  }
}
