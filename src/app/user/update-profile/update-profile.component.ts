import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RegisterService } from '../../services/register.service';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../domain/usuario';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../domain/category';
import { Ciudad } from '../../domain/ciudad';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  providers: [UtilService, RegisterService]
})
export class UpdateProfileComponent implements OnInit {

  updateform: FormGroup;
  messages: any[];
  user: Usuario;
  file: any;
  finalFile: String;
  submitted = false;
  authSubscription: Subscription;
  categories: Category[];
  ciudades: SelectItem[];
  selectedCity: SelectItem;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private utilService: UtilService, private registerService: RegisterService) { 
    this.ciudades = [];
    this.utilService.requestCities().subscribe(ciudades => {
      ciudades.forEach(data =>{
        this.ciudades.push({label: data.nombre, value: data.id})
      })
      this.selectedCity = this.ciudades[(+this.user.ciudad)-1]
      console.log(this.ciudades)
    })
  }

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn.subscribe(authStatus => {
      if (authStatus) {
        this.messages = [];
        this.user = this.authService.userData;
        this.user.favoritas.forEach(data =>{
          this.user.favoritas[this.user.favoritas.indexOf(data)]=""+data
        })
        this.updateform = this.fb.group({
          'favoritas': new FormControl('',Validators.compose([Validators.required])),
          'first_name': new FormControl('', Validators.compose([Validators.required])),
          'last_name': new FormControl('', Validators.compose([Validators.required])),
          'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
          'foto': new FormControl('', Validators.compose([])),
          'direccion': new FormControl('', Validators.compose([Validators.required])),
          'pais': new FormControl('', Validators.compose([Validators.required])),
          'ciudad': new FormControl('',Validators.compose([Validators.required]))
        });
        this.utilService.requestCategories().subscribe(categories => {
          this.categories = categories;
        })
        // this.utilService.requestCities().subscribe(ciudades => {
        //   this.ciudades = ciudades;
        // })
      } else {
        this.router.navigateByUrl('sign-in')
      }
    });
  }

  onSubmit(value: FormGroup) {
    if (this.updateform.valid) {
      this.registerService.updateUser(this.user, this.finalFile).subscribe(data => console.log(data))
      this.router.navigateByUrl('promos')
    }
    this.submitted = true;
  }

  imageUpload(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    reader.onloadend = () => {
      //Assign the result to variable for setting the src of image element
      // this.user.foto = file;
      this.finalFile = reader.result;
    }
    reader.readAsDataURL(file);
    console.log(this.file)
  }

}
