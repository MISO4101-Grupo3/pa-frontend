import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Promo } from '../../domain/promo';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css'],
  providers: [PromoService]
})
export class PromoListComponent implements OnInit {

  promos: Promo[];
  
  constructor(private router: Router, private promoService: PromoService) { }
  
  ngOnInit() {
      this.getPromociones();
  }

  private selectPromo(promo: Promo): void {
    this.router.navigateByUrl('/promos/' + promo.id);
  }

  private getPromociones(): void {
      this.promoService.getPromos()
          .subscribe(promos => this.promos = promos);
  }
}