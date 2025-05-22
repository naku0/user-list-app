import {Component, Input} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {User} from '../../../../core/model/user.model';

import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  imports: [
    RouterLink,
    NzIconDirective,
    NzCardComponent,
    NzTagComponent,
    NzAvatarComponent
  ],
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent{
  protected user!: User

  constructor(private route: ActivatedRoute,
              private userService: UserService) {}

  /**
   * get specific user data by id when component is initialized
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(+id!).subscribe(user => this.user = user);
  }
}
