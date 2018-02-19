import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Promo } from '../domain/promo';
import { Ciudad } from '../domain/ciudad';

@Injectable()
export class PromoService {
    
    constructor(private http: HttpClient) {}
    
    getPromos(categoria?: number, ciudad?:number): Observable<Promo[]>{
        let url = environment.api + '/promociones/?';

        if(categoria){
            url = url+'categoria='+categoria+'&';
        }
        if(ciudad){
            url = url+'ciudad='+ciudad+'&';
        }
        return this.http.get<any>(url)
        .pipe(
            catchError(this.handleError('Fetching /promociones', []))
          );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}