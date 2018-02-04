import { Component, OnInit } from '@angular/core';
import { Promo } from './domain/promo';
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
    
    constructor(private promoService: PromoService) { }
    
    ngOnInit() {
        this.getPromociones();

        this.cols = [
            { field: 'resumen', header: 'Resumen' },
            { field: 'precio', header: 'Precio' },
            { field: 'fechaInicio', header: 'Comienza' },
            { field: 'fechaFin', header: 'Finaliza' }
        ];
    }

    selectPromo(promo: Promo) {
        alert('Listo para la V2');
        // TODO: implement navigation to promo details. User event.data object as parameter
    }

    private getPromociones(): void {
        this.promoService.getPromos()
            .subscribe(promos => this.promos = promos);
    }
    
}

export class PromoView implements Promo {

    constructor(public nombre?, public resumen?, public precio?, public fechaInicio?, public fechaFin?, public imagen?) {}
}