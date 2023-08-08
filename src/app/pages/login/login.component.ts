import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import firebase from 'src/app/services/firebase.service';

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
        password: form.value.pass,
      };

      firebase
        .auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then((response: any) => {
          let info = {
            uid: response.user.uid,
            email: response.user.email,
          };
          localStorage.setItem('identity', JSON.stringify(info));
          this._spinner.hide();
          this._router.navigate(['/space-joy']);
        });
    } else {
      this.validateForm = false;
    }
  }
}
