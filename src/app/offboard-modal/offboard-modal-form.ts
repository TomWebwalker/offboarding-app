import { FormControl, FormGroup, Validators } from '@angular/forms';

export const createOffboardModalForm = () =>
  new FormGroup({
    address: new FormGroup({
      streetLine1: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      country: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      receiver: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    }),
    notes: new FormControl(''),
    phone: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });
