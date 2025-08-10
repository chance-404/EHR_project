import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Registration } from './registration/registration';
import { Orders } from './orders/orders';
import { FlowBoard } from './flow-board/flow-board';
import { Login } from './login/login';
import { Logout } from './logout/logout';


export const routes: Routes = [
    {path: 'dashboard', component: Dashboard,
      canActivate: []
    },

    {path: 'registration', component: Registration,
      canActivate: []
    },

    {path: 'orders', component: Orders,
      canActivate: []
    },

    {path: 'flow-board', component: FlowBoard,
      canActivate: []
    },

    {path: 'login', component: Login,
      canActivate: []
    },

    {path: 'logout', component: Logout},

    {path: '', redirectTo: 'login', pathMatch: 'full'},

    {path: '**', redirectTo: 'login'}
];
