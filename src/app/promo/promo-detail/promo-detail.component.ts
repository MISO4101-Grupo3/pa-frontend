import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Promo } from '../../domain/promo';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss']
})
export class PromoDetailComponent implements OnInit {
  @Input() promo: Promo;

  constructor(
    private route: ActivatedRoute,
    private promoService: PromoService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPromo();
  }

  private getPromo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.promoService.getPromos()
      .subscribe(promos => {
        this.promo = promos.find(promo => +promo.id === id);
      });
  }
}
