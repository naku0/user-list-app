import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {UserFormBase} from '../user-form';
import {UserService} from '../../../../../core/services/user.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-new-user-form',
  standalone: true,
  templateUrl: '../user-form-base.html',
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzFormControlComponent,
    ReactiveFormsModule,
    NzButtonComponent,
    NzFormDirective,
    CommonModule
  ],
  styleUrls: ['../user-form-base.component.scss']
})
export class NewUserFormComponent extends UserFormBase {
  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private message: NzMessageService
  ) {
    super(fb);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.message.success('User created successfully');
          this.router.navigate(['/users']);
        },
        error: () => {
          this.message.error('Error creating user');
          this.isLoading = false;
        }
      });
    }
  }
  protected override onCancel(): void {
    this.router.navigate(['/']);
  }
}
