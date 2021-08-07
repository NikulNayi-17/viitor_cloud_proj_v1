import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

// import { MatChipInputEvent } from '@angular/material/chips';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetUserForm') myNgForm: any;
  userForm!: FormGroup;
  userData: any; // Save logged in user data
  User_ID!: string;

  ngOnInit() {
    this.submitUserForm();
  }

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public ngZone: NgZone,
    public authService: AuthService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {
    /* Saving user data in localstorage when
      logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
        this.User_ID = user.uid,
          this.userForm.patchValue({
            uid: this.User_ID,
          });
      } else {
        localStorage.setItem('user', null!); //null value
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  successSwal() {
    Swal.fire({
      title: 'Hooorrey...!!!',
      icon: 'success',
      text: 'Stored Data Successfully!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  /* Reactive book-user form */
  submitUserForm() {
    this.userForm = this.fb.group({
      uid: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contact_no: ['', [Validators.required]],
      project_name: ['', [Validators.required]],
      current_address: ['', [Validators.required]],
      site_address: ['', [Validators.required]],

    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  /* Reset form */
  resetForm() {
    // this.languageArray = [];
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null)
    });
  }

  /* Submit book-user */
  submitUser() {
    if (this.userForm.valid) {
      this.authService.AddUser(this.userForm.value);
      this.router.navigate(['dashboard']);
      this.resetForm();
      this.successSwal();
    }
  }

}
