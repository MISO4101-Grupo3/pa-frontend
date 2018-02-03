import { Component, OnInit } from '@angular/core';
import { Promo } from './domain/car';
import { PromoService } from './services/promo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PromoService]
})
export class AppComponent implements OnInit{
     
    promos: Promo[];

    cols: any[];
    
    constructor(private carService: PromoService) { }
    
    ngOnInit() {
        this.carService.getPromos().then(promos => this.promos = promos);

        this.cols = [
            { field: 'resumen', header: 'Resumen' },
            { field: 'precio', header: 'Precio' },
            { field: 'fechaInicio', header: 'Comienza' },
            { field: 'fechaFin', header: 'Finaliza' }
        ];
    }

    onRowSelect(event) {
        // TODO: implement navigation to promo details. User event.data object as parameter
    }
    
}

export class PromoView implements Promo {

    constructor(public resumen?, public precio?, public fechaInicio?, public fechaFin?) {}
}