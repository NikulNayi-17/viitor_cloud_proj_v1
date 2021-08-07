import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guard/auth.guard";

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UsersComponent } from './components/users/users.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { OwnerDetailsComponent } from './components/owner-details/owner-details.component';
import { ServProvDetailsComponent } from './components/serv-prov-details/serv-prov-details.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { VeEmSpComponent } from './components/ve-em-sp/ve-em-sp.component';


import { HDashboardComponent } from './users/House_Owner/h-dashboard/h-dashboard.component';
import { SDashboardComponent } from '../app/users/Service_Provider/s-dashboard/s-dashboard.component';
import {HChatroomComponent} from './users/House_Owner/h-chatroom/h-chatroom.component'



const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user/:roles', component: SignUpComponent },
  { path: 'user-role', component: UserRoleComponent }, // , canActivate: [AuthGuard]
  { path: 'owner-details', component: OwnerDetailsComponent }, // , canActivate: [AuthGuard]
  { path: 'servprov-details', component: ServProvDetailsComponent }, // , canActivate: [AuthGuard]
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'veri-email-address', component: VeEmSpComponent },


  { path: 'Odashboard', component: HDashboardComponent, canActivate: [AuthGuard] },
  { path: 'Sdashboard', component: SDashboardComponent, canActivate: [AuthGuard] },
  {path:'chatroom/:name',component:HChatroomComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
