import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Promo } from '../../domain/promo';
import { Comment } from '../../domain/comment';
import { PromoService } from '../../services/promo.service';
import { CommentService } from '../../services/comment.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss']
})
export class PromoDetailComponent implements OnInit {
  @Input() promo: Promo;
  @Input() comments: Comment[];
  id: Number;
  display: boolean = false;
  commentForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private promoService: PromoService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getPromo();
    this.getComments();
    this.commentForm = this.fb.group({
      'correo': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'texto': new FormControl('',Validators.compose([Validators.required, Validators.maxLength(300)]))
    });
  }

  private getPromo(): void {
    this.promoService.getPromos()
      .subscribe(promos => {
        this.promo = promos.find(promo => +promo.id === this.id);
      });
  }

  private getComments(): void {
    this.commentService.getComments()
      .subscribe(comments => {
        this.comments = comments.filter(comment => +comment.promocion === this.id);
      });
  }

  showDialog() {
    this.commentForm.reset();
    this.display = true;
  }

  onSubmit(value: Comment) {
    if (this.commentForm.valid) {
      console.log(value)
      console.log({texto: value.texto, correo: value.correo, promocion: ""+this.id})
      this.commentService.addComment({texto: value.texto, correo: value.correo, promocion: ""+this.id}).subscribe(data => {this.display = false, this.getComments()})
    }
    this.submitted = true;
  }
}
