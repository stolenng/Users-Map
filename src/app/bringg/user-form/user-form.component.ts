import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import User from '../models/User';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<User> = new EventEmitter<User>();

  userForm: FormGroup;
  submitted: boolean = false;

  private PICTURE = `https://cdn4.iconfinder.com/data/icons/city-life/500/developer-512.png`;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    
    let user: User = this.userForm.value;

    user.id = Date.now().toString();
    user.picture = this.PICTURE;

    this.add.emit(user);
    this.reset();
  }

  reset() {
    this.userForm.reset();
    this.submitted = false;
  }

  get f() { return this.userForm.controls; }

  createFormGroup() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      age: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      isActive: [true]
    });
  }
}
