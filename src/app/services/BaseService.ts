import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";


@Injectable({
    providedIn: 'root',
  })
export class BaseService{

    baseUrl: string= "https://localhost:7170/Waisen/";

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
         if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
         } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         }

         window.alert(errorMessage);
         return throwError(() => errorMessage);
    }

}