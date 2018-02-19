import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../domain/category';
import { environment } from '../../environments/environment';


@Injectable()
export class CategoriaService {
    
    constructor(private http: HttpClient) {}
    
    getCategorias(): Observable<Category[]>{
        return this.http.get<any>( environment.api + '/categorias/')
        .pipe(
            catchError(this.handleError('Fetching /categorias', []))
          );
    }

    addCategoria(categoria: Category): Observable<Category>{
        return this.http.post<any>( environment.api + '/categorias/', categoria)
        .pipe(catchError(this.handleError('Fetching /categorias', [])))
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