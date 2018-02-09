import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../domain/user';

@Injectable()
export class AuthService {

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    
    constructor(private http: HttpClient) {}
    
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(user: User){
        //TODO: real validation against server
        if (user.username !== '' && user.password != '' ){
            this.loggedIn.next(true);
        }
    }

    logout(){
        this.loggedIn.next(false);
    }
}