import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Promo } from '../domain/car';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PromoService {
    
    constructor(private http: HttpClient) {}
    
    getPromos() {
        return this.http.get<any>('assets/data/promo-small.json')
            .toPromise()
            .then(res => <Promo[]> res.data)
            .then(data => data);
    }
}