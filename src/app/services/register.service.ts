import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RegisterUser } from '../domain/registeruser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Usuario } from '../domain/usuario';

@Injectable()
export class RegisterService {

    constructor(private http: HttpClient) {}

    private registerIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isRegistered() {
        return this.registerIn.asObservable();
    }

    register(user: RegisterUser) {
        //TODO: real validation against server
        if (user.email !== '' && user.password != '' && user.ciudad !== '' && user.pais !== ''){
            this.requestRegister(user).subscribe(
                data => {
                        this.registerIn.next(true);
                    }
            );
        }
        else {
            this.registerIn.next(false);
        }
    }



    private requestRegister(user: RegisterUser): Observable<any> {
        return this.http.post<any>( environment.api + '/usuarios/', user)
            .pipe(
                catchError(this.handleError('Failure authenticating user', {}))
              );
    }

    updateUser(user: Usuario, file: any): Observable<any> {
        return this.http.patch<any>( environment.api + '/usuarios/'+user.id+"/", {... user, foto: null}).pipe(catchError(this.handleError('Failure authenticating user', {})))
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }



}