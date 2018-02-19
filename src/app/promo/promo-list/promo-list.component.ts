import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Promo } from '../../domain/promo';
import { Category } from '../../domain/category';
import { Ciudad } from '../../domain/ciudad';
import { CiudadService } from '../../services/ciudad.service';
import { PromoService } from '../../services/promo.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css'],
  providers: [PromoService,CiudadService,CategoriaService]
  
})
export class PromoListComponent implements OnInit {
 
  promos: Promo[];
  ciudades: Ciudad[];
  ciudad_actual: Ciudad;
  categoria_actual: Category;
  categorias: Category[];
  categoriaSeleccionada: string;
  ciudadSeleccionada: string;
  
  constructor(
    private router: Router, 
    private promoService: PromoService,
    private ciudadService: CiudadService,
    private categoriaService: CategoriaService
  ) { }
  
  ngOnInit() {
      this.getPromociones();
      this.getCiudades();
      this.getCategorias();
      this.ciudadSeleccionada ='';

  }

  private onChangeCiudad(newValue){
    this.ciudadSeleccionada = newValue;
    this.getPromocionesCategoriasCiudad();
  }
  private onChangeCategoria(newValue){
    this.categoriaSeleccionada = newValue;
    this.getPromocionesCategoriasCiudad();
  }

  private selectPromo(promo: Promo): void {
    this.router.navigateByUrl('/promos/' + promo.id);
  }

  private getPromociones(): void {

      this.promoService.getPromos()
          .subscribe(promos => this.promos = promos);
  }

  private getPromocionesCategoriasCiudad(): void {

    this.promoService.getPromos(this.getCategoriaByName(),this.getCiudadByName())
        .subscribe(promos => this.promos = promos);
}
  private getCiudadByName(): number {
    if(this.ciudadSeleccionada == undefined || this.ciudadSeleccionada == ''){
      return 0;
    }
    else{
    this.ciudad_actual = this.ciudades.find(x => x.nombre == this.ciudadSeleccionada);
    return this.ciudad_actual.id;
  }
}

private getCategoriaByName(): number {
  if(this.categoriaSeleccionada == undefined || this.categoriaSeleccionada == ''){
    return 0;
  }
  else{
    this.categoria_actual = this.categorias.find(x => x.nombre == this.categoriaSeleccionada);
    return this.categoria_actual.id;
  }
  

}

  private getCiudades(): void {
    this.ciudadService.getCiudades()
        .subscribe(ciudad => this.ciudades = ciudad);
  }

  private getCategorias(): void {
    this.categoriaService.getCategorias()
        .subscribe(categoria => this.categorias = categoria);
  }

}
