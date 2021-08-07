import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Reactive Form
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { VeEmSpComponent } from './components/ve-em-sp/ve-em-sp.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { OwnerDetailsComponent } from './components/owner-details/owner-details.component';
import { ServProvDetailsComponent } from './components/serv-prov-details/serv-prov-details.component';
import { AngularMaterialModule } from './angular-material.module';


// User Components
import { HDashboardComponent } from '../app/users/House_Owner/h-dashboard/h-dashboard.component';
import { HAddmemberComponent } from '../app/users/House_Owner/h-addmember/h-addmember.component';
import { HListChatroomComponent } from './users/House_Owner/h-list-chatroom/h-list-chatroom.component';
import { HDialogboxComponent } from '../app/users/House_Owner/h-dialogbox/h-dialogbox.component';
import { HPersonaldetailsComponent } from '../app/users/House_Owner/h-personaldetails/h-personaldetails.component';
import { HProgressComponent } from '../app/users/House_Owner/h-progress/h-progress.component';
import { HRemovememberComponent } from '../app/users/House_Owner/h-removemember/h-removemember.component';
import { HSpinfoComponent } from '../app/users/House_Owner/h-spinfo/h-spinfo.component';
import { HTabsComponent } from '../app/users/House_Owner/h-tabs/h-tabs.component';
import { HTimelineComponent } from '../app/users/House_Owner/h-timeline/h-timeline.component';
import { HTrackComponent } from '../app/users/House_Owner/h-track/h-track.component';
import { HMainscreenComponent } from '../app/users/House_Owner/h-mainscreen/h-mainscreen.component';
import {HChatroomComponent}  from '../app/users/House_Owner/h-chatroom/h-chatroom.component'

import { SDashboardComponent } from '../app/users/Service_Provider/s-dashboard/s-dashboard.component';
import { SChatroomComponent } from '../app/users/Service_Provider/s-chatroom/s-chatroom.component';
import { SDialogboxComponent } from '../app/users/Service_Provider/s-dialogbox/s-dialogbox.component';
import { SPersonaldetailsComponent } from '../app/users/Service_Provider/s-personaldetails/s-personaldetails.component';
import { SProgressComponent } from '../app/users/Service_Provider/s-progress/s-progress.component';
import { STabsComponent } from '../app/users/Service_Provider/s-tabs/s-tabs.component';
import { STimelineComponent } from '../app/users/Service_Provider/s-timeline/s-timeline.component';
import { STrackComponent } from '../app/users/Service_Provider/s-track/s-track.component';
import { SProjectinfoComponent } from '../app/users/Service_Provider/s-projectinfo/s-projectinfo.component';
import { LeaveProjectComponent } from '../app/users/Service_Provider/leave-project/leave-project.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavbarComponent,
    UsersComponent,
    UserRoleComponent,
    OwnerDetailsComponent,
    EditUserComponent,
    ServProvDetailsComponent,
    VeEmSpComponent,
    HDashboardComponent,
    HAddmemberComponent,
    HListChatroomComponent,
    HChatroomComponent,
    HDialogboxComponent,
    HPersonaldetailsComponent,
    HProgressComponent,
    HRemovememberComponent,
    HSpinfoComponent,
    HTabsComponent,
    HTimelineComponent,
    HTrackComponent,
    HMainscreenComponent,
    SDashboardComponent,
    SChatroomComponent,
    SDialogboxComponent,
    SPersonaldetailsComponent,
    SProgressComponent,
    STabsComponent,
    STimelineComponent,
    STrackComponent,
    SProjectinfoComponent,
    LeaveProjectComponent,
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // firebaseConfig
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  
  providers: [AuthService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
