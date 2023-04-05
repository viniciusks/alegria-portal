import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import * as shajs from 'sha.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  validateForm: boolean;
  errorFlag: boolean;

  constructor(
    private _userService: UserService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    this.validateForm = true;
    this.errorFlag = false;
  }

  ngOnInit(): void {
    console.log('[OK] LoginComponent');
  }

  onSubmit(form: any) {
    this._spinner.show();

    if (form.value.email != '' && form.value.pass != '') {
      this.validateForm = true;

      let info = {
        email: form.value.email,
        password: shajs('sha256').update(form.value.pass).digest('hex'),
      };

      this._userService.login(info).subscribe({
        next: (res) => {
          this.errorFlag = false;

          let info = {
            email: res.email,
            accessToken: res.accessToken,
          };

          localStorage.setItem('identity', JSON.stringify(info));
          this._spinner.hide();
          this._router.navigate(['/space-joy']);
        },
        error: (error) => {
          console.log('Error msg: ', error);

          this.errorFlag = true;

          this._spinner.hide();
        },
      });
    } else {
      this.validateForm = false;
    }
  }
}
