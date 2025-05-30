import { Routes } from '@angular/router';
import {LayoutComponent} from './features/ui/layout/layout.component';
import {MainPageComponent} from './features/users/components/main-page/main-page.component';


/**
 * if you are on the '/' page proggram will load LayoutComponent with MainPageComponent
 * and when you are on '/users' page proggram will user custom routes from './features/users/users.routes'
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.routes')
          .then(m => m.USER_ROUTES)
      }
    ]
  }
];
