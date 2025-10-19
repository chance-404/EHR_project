import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Registration } from './registration/registration';
import { Orders } from './orders/orders';
import { FlowBoard } from './flow-board/flow-board';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { AuthGuard } from './service/auth-guard';
import { NgModule } from '@angular/core';
import { PatientInfo } from './patient-info/patient-info';


export const routes: Routes = [
    {path: 'dashboard', component: Dashboard,
      canActivate: [AuthGuard]
    },

    {path: 'registration', component: Registration,
      canActivate: [AuthGuard]
    },

    {path: 'orders', component: Orders,
      canActivate: [AuthGuard]
    },

    {path: 'flow-board', component: FlowBoard,
      canActivate: [AuthGuard]
    },

    {path: 'patient-info/:mrn', component: PatientInfo,
      canActivate: [AuthGuard]
    },

    {path: 'login', component: Login,
      canActivate: []
    },

    {path: 'logout', component: Logout},

    {path: '', redirectTo: 'login', pathMatch: 'full'},

    {path: '**', redirectTo: 'login'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }