import {Routes} from '@angular/router';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {NewUserFormComponent} from './components/user-forms/new-user-form/new-user-form.component';
import {ChangeUserFormComponent} from './components/user-forms/change-user-form/change-user-form.component';

/**
 * Custom routes for the users module
 */
export const USER_ROUTES: Routes = [
  { path: 'create', component: NewUserFormComponent },
  { path: ':id', component: UserDetailComponent },
  { path: 'edit/:id', component: ChangeUserFormComponent }
];
