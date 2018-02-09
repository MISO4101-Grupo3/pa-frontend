import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userform: FormGroup;

  submitted: boolean;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
      this.userform = this.fb.group({
          'username': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
          'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
      });
  }

  onSubmit(value: string) {
    if ( this.userform.valid ) {
        this.authService.login(this.userform.value);
    }
    this.submitted = true;
    this.router.navigateByUrl("promos");
  }

}
