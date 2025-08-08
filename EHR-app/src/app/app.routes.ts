import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Registration } from './registration/registration';
import { Orders } from './orders/orders';
import { FlowBoard } from './flow-board/flow-board';
import { Login } from './login/login';

export const routes: Routes = [
    {path: 'dashboard', component: Dashboard},

    {path: 'registration', component: Registration},

    {path: 'orders', component: Orders},

    {path: 'flow-board', component: FlowBoard},

    {path: 'login', component: Login},

    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
