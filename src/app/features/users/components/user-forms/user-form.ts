import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../../../../core/model/user.model';

export abstract class UserFormBase {
  userForm: FormGroup;
  isLoading = false;
  isEditMode = false;

  protected constructor(protected fb: FormBuilder) {
    this.userForm = this.initForm();
  }

  protected initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: [''],
      address: this.fb.group({
        city: [''],
        street: ['']
      }),
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });
  }

  protected patchForm(user: User): void {
    this.userForm.patchValue({
      ...user,
      address: {
        city: user.address.city,
        street: user.address.street
      },
      company: {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs
      }
    });
  }
  protected abstract onSubmit(): void;

  protected onCancel(): void {}
}
