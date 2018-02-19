import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Ciudad } from '../domain/ciudad';
import { environment } from '../../environments/environment';


@Injectable()
export class CiudadService {
    
    constructor(private http: HttpClient) {}
    
    getCiudades(): Observable<Ciudad[]>{
        return this.http.get<any>( environment.api + '/ciudades/')
        .pipe(
            catchError(this.handleError('Fetching /ciudades', []))
          );
    }

    addCiudad(ciudad: Ciudad): Observable<Ciudad>{
        return this.http.post<any>( environment.api + '/ciudades/', ciudad)
        .pipe(catchError(this.handleError('Fetching /ciudades', [])))
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