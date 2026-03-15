import { RouterModule, Routes } from '@angular/router';
import { PatientList } from './patient-list/patient-list';
import { Registration } from './registration/registration';
import { FlowBoard } from './flow-board/flow-board';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { AuthGuard } from './service/auth-guard';
import { NgModule } from '@angular/core';
import { PatientInfo } from './patient-info/patient-info';
import { GenerateReports } from './generate-reports/generate-reports';


export const routes: Routes = [
    {path: 'patient-list', component: PatientList,
      canActivate: [AuthGuard]
    },

    {path: 'registration', component: Registration,
      canActivate: [AuthGuard]
    },

    {path: 'flow-board', component: FlowBoard,
      canActivate: [AuthGuard]
    },

    {path: 'patient-info/:mrn', component: PatientInfo,
      canActivate: [AuthGuard]
    },

	{path: 'generate-reports', component: GenerateReports,
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