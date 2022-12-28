import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // @ViewChild('contactForm') loginForm!: NgForm;
  // username: string = ''
  // password: string = ''
  loginForm!: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get f() {
    return this.loginForm.controls;
  }

  public validate(): void {
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      return;
    }
  }

  onSubmit() {
    // debugger;
    console.log('ifo ', this.username, ' ', this.password);
    //this.notShow=true;
    //this.router.navigate(['admin-page'])
    this.router.navigate(['dashboard']);
  }
}
