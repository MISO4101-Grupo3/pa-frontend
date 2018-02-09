import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../domain/user';

@Injectable()
export class AuthService {

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private token: String;
    
    constructor(private http: HttpClient) {}
    
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(user: User) {
        //TODO: real validation against server
        if (user.email !== '' && user.password != '' ){
            this.requestAuthenticationToken(user).subscribe(
                data => {
                    if( 'token' in data){
                        this.token = data.token;
                        this.loggedIn.next(true);
                    }
                    else {
                        this.loggedIn.next(false);
                    }
                }
            );
        }
        else {
            this.loggedIn.next(false);
        }
    }

    private requestAuthenticationToken(user: User): Observable<any> {
        return this.http.post<any>( environment.api + '/auth/login/', user)
            .pipe(
                catchError(this.handleError('Failure authenticating user', {}))
              );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

    logout() {
        this.token = null;
        this.loggedIn.next(false);
    }
}