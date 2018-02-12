import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Promo } from '../../domain/promo';
import { Comment } from '../../domain/comment';
import { PromoService } from '../../services/promo.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss']
})
export class PromoDetailComponent implements OnInit {
  @Input() promo: Promo;
  @Input() comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private promoService: PromoService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.getPromo();
    this.getComments();
  }

  private getPromo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.promoService.getPromos()
      .subscribe(promos => {
        this.promo = promos.find(promo => +promo.id === id);
      });
  }

  private getComments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService.getComments()
      .subscribe(comments => {
        this.comments = comments.filter(comment => +comment.promocion === id);
      });
  }
}
