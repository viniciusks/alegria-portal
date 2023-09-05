import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import firebase from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, MessageService],
})
export class LoginComponent implements OnInit {
  validateForm: boolean;
  errorFlag: boolean;
  displayModal: boolean;
  recoverEmail: string;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    this.validateForm = true;
    this.errorFlag = false;
    this.displayModal = false;
    this.recoverEmail = '';
  }

  ngOnInit(): void {
    console.log('[OK] LoginComponent');
  }

  showModalDialog() {
    this.displayModal = true;
  }

  sendEmailRecoverPassword() {
    this._spinner.show();
    if (this.recoverEmail != '') {
      firebase
        .auth()
        .sendPasswordResetEmail(this.recoverEmail)
        .then(() => {
          this.displayModal = false;
          this._messageService.add({
            severity: 'success',
            summary: 'E-mail enviado',
            detail:
              'Verifique sua caixa de e-mail pelo link de recuperação de senha.',
          });
          this._spinner.hide();
        });
    }
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
        })
        .catch((error) => {
          if (error.code == 'auth/wrong-password') {
            this._messageService.add({
              severity: 'error',
              summary: 'Senha incorreta',
              detail: 'Verifique se preencheu corretamente.',
            });
          }
          this._spinner.hide();
        });
    } else {
      this.validateForm = false;
    }
  }
}
