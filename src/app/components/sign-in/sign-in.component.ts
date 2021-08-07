import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormControl, Validators } from '@angular/forms';
import  firebase from 'firebase/app';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  uEmail:any
  constructor(
    public authService: AuthService
  ) { 
    // this.uEmail = firebase.auth().currentUser?.email
      
    // console.log(this.email);
    
  }
  ngOnInit(): void {

  }
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must Enter Your E-mail.';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
}
