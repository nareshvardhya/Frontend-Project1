import { Routes } from '@angular/router';
import { EmployeeForm } from './components/employee-form/employee-form';
import { EmployeeList } from './components/employee-list/employee-list';

export const routes: Routes = [
    {path:"", component:EmployeeList},
    {path:"add", component:EmployeeForm},
    {path:"edit/:id", component:EmployeeForm}
];
