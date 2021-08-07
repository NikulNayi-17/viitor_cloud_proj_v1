import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  userRole: any;
  hide = true;
  uRole: string | null | undefined;
  YrRole!: string;
  // authentService!: any;
  // userRole!: any

  constructor(
    public authService: AuthService,
    private _Activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.uRole = params.get('roles');
      // console.log(this.uRole)
      this.userRole = this.uRole;
      // return this.uRole;
    });
    this.checkRole()
    // console.log("Outside " + this.userRole)
    // const uRole = this._Activatedroute.snapshot.paramMap.get("roles");
  }

  checkRole() {
    if(this.userRole === "Owner") {
      // console.log("If Loop " + this.userRole);
      this.YrRole = "Owner";
      // return this.YrRole;
    }
    else if (this.userRole === "ServiceProvider") {
      // console.log("Else If Loop " + this.userRole);
        this.YrRole = "ServiceProvider";
      // return this.YrRole;
    }
    // console.log("Loop " + this.YrRole);
    return this.YrRole;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must Enter Your E-mail.';
    }

    return this.email.hasError('email') ? 'Not a valid E-mail' : '';
  }

  getErrorMsg() {
    if (this.userRole.hasError('required')) {
      return 'You must Enter Your Role as User.';
    }

    return this.email.hasError('userRole') ? 'Not a valid User Role' : '';
  }
}
