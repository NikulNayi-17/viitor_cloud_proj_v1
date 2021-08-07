// import { User } from '../../shared/services/user';
// import { User02 } from '../../shared/services/user02';
import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  // user$: any;
  userData: any; // Save logged in user data
  // user = this.afAuth.currentUser;
  uid!: string;

  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  /* Delete */
  removeUser = (user: { uid: string }) => this.authService.deleteUser(user);
}
