import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class UtilService {
    
    constructor(private http: HttpClient) {}

    requestCategories(): Observable<any> {
        return this.http.get<any>( environment.api + '/categorias').pipe(catchError(this.handleError('Failure retrieving categories data', {}))
              );
    }

    requestCities(): Observable<any> {
        return this.http.get<any>( environment.api + '/ciudades').pipe(catchError(this.handleError('Failure retrieving cities data', {}))
                );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}