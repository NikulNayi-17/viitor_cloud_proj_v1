import { User } from './user';
import { Urole } from './urole';
import { User02 } from './user02';
import { User03 } from './user03';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  uR: any;
  uid: any;
  uuid: any;
  gUserData: any;
  eMail: any;
  temp_role: any;
  t_uid: any;
  t_mail: any;
  t_pass: any;
  currentUser: any;

  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public ngFireAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUser = user;
    });

    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');

        // this.uuid = user.uid;

        // console.log("On init in service : " + this.uuid);
        // return this.uuid;
      } else {
        localStorage.setItem('user', null!); //null value
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }

  // logInUser(): void {
  //   this.afAuth.setPersistence('local').then(() => {
  //     this.afAuth
  //       .signInWithEmailAndPassword(this.t_mail, this.t_pass)
  //       .then((userCredential) => {
  //         this.currentUser = userCredential.user;
  //         console.log(this.currentUser);
  //       });
  //   });
  // }

  // Sign in with email/password
  async SignIn(email: any, password: any) {
    try {
      const result: { user: any } =
        await this.afAuth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        // console.log(result);
        // console.log(this.t_uid);

        this.t_uid = result.user.uid;
        this.t_mail = result.user.email;
        this.t_pass = result.user.password;
        localStorage.setItem('email',this.t_mail)
        
        console.log("my email "+localStorage.getItem('email'));
        // console.log(this.t_pass);
        this.goToPage();
      });
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  goToPage() {
    this.afs
      .collection('users')
      // .doc('users/' + this.uid)
      .doc(this.t_uid)
      .valueChanges()
      .subscribe((useR) => {
        this.gUserData = useR;
        this.temp_role = this.gUserData.userRole;
        // console.log(this.temp_role);

        if (this.temp_role === 'Owner') {
          this.router.navigate(['Odashboard']);
          // console.log('Hooreeeyyyyy : ' + this.temp_role);
        } else if (this.temp_role === 'ServiceProvider') {
          this.router.navigate(['Sdashboard']);
          // console.log('Better luck next time : ' + this.temp_role);
        }
        // else {
        //   console.log('User Not Found !');
        // }
        // }
      });

    // if (this.temp_role === 'Owner') {
    //   this.router.navigate(['Odashboard']);
    //   // console.log('Hooreeeyyyyy : ' + this.temp_role);
    // } else if (this.temp_role === 'ServiceProvider') {
    //   this.router.navigate(['Sdashboard']);
    //   // console.log('Better luck next time : ' + this.temp_role);
    // } else {
    //   console.log('User Not Found !');
    // }
  }

  // Sign up with email/password
  async SignUp(email: any, password: any, userRole: any) {
    try {
      const result: { user: any } =
        await this.afAuth.createUserWithEmailAndPassword(email, password);

      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      await this.SendVerificationMail();

      // Set User Details
      await this.SetUserData(result.user);

      // Set User Role
      this.uR = userRole;
      this.SetUserRole(result.user);

      return this.uR;
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.ngFireAuth.currentUser
      .then((u) => u!.sendEmailVerification())
      .then(() => {
        if (this.uR === 'Owner') {
          this.router.navigate(['verify-email-address']);
        } else if (this.uR === 'ServiceProvider') {
          // console.log(this.uR)
          this.router.navigate(['veri-email-address']);
        }
      });
  }

  // Set User Role
  SetUserRole(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: Urole = {
      userRole: this.uR,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Add Owner details
  AddUser(user: User02) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User02 = {
      uid: user.uid,
      first_name: user.first_name,
      last_name: user.last_name,
      contact_no: user.contact_no,
      project_name: user.project_name,
      current_address: user.current_address,
      site_address: user.site_address,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Add Service Provider details
  AddUserSP(user: User03) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User03 = {
      uid: user.uid,
      first_name: user.first_name,
      last_name: user.last_name,
      contact_no: user.contact_no,
      occupation: user.occupation,
      designation: user.designation,
      experiance: user.experiance,
      company_name: user.company_name,
      comp_address: user.comp_address,
      web_url: user.web_url,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: any) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password Reset E-mail Sent, Check Your Inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    this.afAuth.setPersistence('session').then(() => {
      this.afAuth
        .signInWithEmailAndPassword(this.t_mail, this.t_pass)
        .then((userCredential) => {
          this.currentUser = userCredential.user;
          console.log(this.currentUser);
        });
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  /* Delete User */
  deleteUser(user: any) {
    return this.afs.collection('users').doc(user.uid).delete();
  }

  /* Update User */
  updateUser(user: User02, uid: any) {
    return this.afs.collection('users').doc(uid).update({
      first_name: user.first_name,
      last_name: user.last_name,
      contact_no: user.contact_no,
      project_name: user.project_name,
    });
  }

  /* Get User */
  getUserDoc(id: any) {
    return this.afs.collection('users').doc(id).valueChanges();
  }

  /* Get User-list */
  // GetUsers() {
  //   // console.log(this.uuid);

  //   this.userData = this.afs
  //     // .collection('users')
  //     .doc('users/' + this.uuid)
  //     .valueChanges()
  //     .subscribe((useR) => {
  //       // console.log(useR);

  //       this.gUserData = useR;
  //       console.log(this.gUserData);
  //       return this.gUserData
  //     });

  //   // this.userData = this.afs
  //   //   .collection('users') // .doc(id)
  //   //   .snapshotChanges();
  //   // return this.userData;
  // }

  // GetUser() {
  //   // console.log(this.uuid);
  //   // const userRef = this.afs.collection('/users', (ref) =>
  //   //   ref.where('uid', '==', this.uuid)
  //   // ).get();
  //   // console.log(userRef);
  //   // return userRef;
  //   // const snapshot = await userRef.where('email', '==', 'eMail').get();
  //   //  console.log("Inside the GetUser : " + this.uuid);
  //   // this.gUserData = this.afs
  //   //   .collection('users').where('email', '==', 'eMail').get();
  //   //   .doc(this.eMail).get;
  //   //   .valueChanges();
  //   //  console.log(this.gUserData)
  //   // return this.gUserData;
  // }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  // async AuthLogin(provider: any) {
  //   try {
  //     const result: { user: any; } = await this.afAuth.signInWithPopup(provider);
  //     this.ngZone.run(() => {
  //       this.router.navigate(['dashboard']);
  //     });
  //     this.SetUserData(result.user);
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // }
}
