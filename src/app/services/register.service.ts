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
        /*if (user.email !== '' && user.password != '' && user.ciudad !== '' && user.pais !== ''){*/
      this.requestRegister(user)
        .subscribe(
          data => {
            this.registerIn.next(true);
          }
        );

    }


  private requestRegister(user: RegisterUser): Observable<any> {
    const userForm = new FormData();

    userForm.append('foto', user.foto, user.foto.name);
    userForm.append('email', user.email);
    userForm.append('password', user.password);
    userForm.append('pais', user.pais);
    userForm.append('first_name', user.first_name);
    userForm.append('last_name', user.last_name);
    userForm.append('ciudad', user.ciudad);
    userForm.append('direccion', user.direccion);


    return this.http.post<any>(environment.api + '/usuarios/', userForm)
    //return this.http.post<any>('https://miso4101.herokuapp.com/api/usuarios/', userForm)
      .pipe(
        catchError(this.handleError('Failure authenticating user', {}))
      );
  }



    updateUser(user: Usuario): Observable<any> {

      const userForm = new FormData();

      userForm.append('foto', user.foto, user.foto.name);
      userForm.append('email', user.email);
      userForm.append('pais', user.pais);
      userForm.append('first_name', user.first_name);
      userForm.append('last_name', user.last_name);
      userForm.append('ciudad', user.ciudad);
      userForm.append('direccion', user.direccion);

        return this.http.patch<any>( environment.api + '/usuarios/'+user.id+"/", userForm)
          .pipe(catchError(this.handleError('Failure authenticating user', {})))
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }



}
