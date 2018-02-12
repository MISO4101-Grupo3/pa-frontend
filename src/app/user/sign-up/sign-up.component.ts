import { SelectItem } from 'primeng/components/common/selectitem';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userform: FormGroup;
  submitted: boolean;
  ciudad: SelectItem[];
  firstTime: boolean;
  registerSubscription: Subscription;
  msgs: any[];

  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService) {}

  ngOnInit() {
    this.msgs = [];
    this.firstTime = true;
    this.userform = this.fb.group({
        'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
        'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        'ciudad': new FormControl('', Validators.required),
        'pais': new FormControl('', Validators.required),
        'first_name': new FormControl('', Validators.required),
        'last_name': new FormControl('', Validators.required),
        'direccion': new FormControl('', Validators.required),
        'foto': new FormControl(''),
        'favoritas': new FormControl('')

    });
    this.ciudad = [];
    this.ciudad.push({label:'Seleccionar una Ciuidad', value:''});
    this.ciudad.push({label:'Bogotá', value:1});
    this.handleAuth();
  }

  onSubmit(value: string) {
    if ( this.userform.valid ) {
        this.registerService.register({...this.userform.value, foto: null, favoritas: []});
    }
    this.submitted = true;
  }

  private handleAuth(): void {
    this.registerSubscription = this.registerService.isRegistered.subscribe(authStatus => {
      if ( authStatus ){
        this.msgs.push({severity:'info', summary:'Registro Exitoso', detail:'Ya estas Registrado, Puedes ingresar por el login'});
      }
      else {
        this.submitted = false;
        if ( !this.firstTime ){
          this.msgs.push({severity:'danger', summary:'Falló el Registro', detail:'Algun campo que ingresaste no es valido'});
        }
        this.firstTime = false;
      }
    });
  }

}
