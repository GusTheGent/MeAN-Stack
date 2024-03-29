import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userSrv: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['john@gmail.com', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required, Validators.minLength]],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    // Instead of accessing the form controls like loginForm.controls.email for example
    // I can access it with a getter fucntion like this fc.email
    // This is the purpose if this fc(){} getter function
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this.userSrv
      .login({
        email: this.fc.email.value,
        password: this.fc.password.value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
