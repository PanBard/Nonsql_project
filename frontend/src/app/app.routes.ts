import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { ApiDashboardComponent } from './api-dashboard/api-dashboard.component';
import { DbManagementComponent } from './db-management/db-management.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'api', component: ApiDashboardComponent },
    { path: 'manage_database', component: DbManagementComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LogInComponent },
];
