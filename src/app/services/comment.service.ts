import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Comment } from '../domain/comment';

@Injectable()
export class CommentService {
    
    constructor(private http: HttpClient) {}
    
    getComments(): Observable<Comment[]>{
        return this.http.get<any>( environment.api + '/comentarios/')
        .pipe(
            catchError(this.handleError('Fetching /comentarios', []))
          );
    }

    addComment(comment: Comment): Observable<Comment>{
        return this.http.post<any>( environment.api + '/comentarios/', comment)
        .pipe(catchError(this.handleError('Fetching /comentarios', [])))
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