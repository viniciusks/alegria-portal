import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PasswordValidation } from 'src/app/services/validations/password.validation';
import { NgxSpinnerService } from 'ngx-spinner';
import firebase from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UtilsService, UserService],
})
export class RegisterComponent implements OnInit {
  isBR: boolean;
  validateForm: any;
  infos: any;
  number: boolean;
  upper: boolean;
  lower: boolean;
  len: boolean;
  private user: User;

  constructor(
    private _utilsService: UtilsService,
    private _userService: UserService,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {
    this.isBR = false;
    this.number = false;
    this.upper = false;
    this.lower = false;
    this.len = false;
    this.validateForm = {
      flag: false,
      message: 'Preencha todas as informações corretamente!',
    };
    this.infos = {
      states: [],
      cities: [],
    };
    this.user = new User(
      '',
      '',
      new Date(),
      '',
      '',
      '',
      '',
      '',
      ['ALEGRIA_USER'],
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      []
    );
  }

  ngOnInit(): void {
    console.log('[OK] Component: register.');
    // Inicia o spinner
    this._spinner.show();

    // Traz todos os estados
    this.getStates();
  }

  getStates() {
    // Requisita todos os estados da API
    this._utilsService.getStates().subscribe((res: any) => {
      let states: any[] = [];
      res.forEach((state: any) => {
        states.push(state.sigla);
      });
      this.infos.states = states;
      // Esconde o spinner
      this._spinner.hide();
    });
  }

  onChange(event: any) {
    // Inicia o spinner
    this._spinner.show();
    // Toda vez que muda o valor do select, o valor do array cities atualiza
    this._utilsService.getCities(event.value).subscribe((res) => {
      let cities: any[] = [];
      res.forEach((city: any) => {
        cities.push(city.nome);
      });
      this.infos.cities = cities;
      this._spinner.hide();
    });
  }

  validateConditions() {
    if (this.number && this.upper && this.lower && this.len) return true;
    return false;
  }

  validationPassword(form: any) {
    let { number, upper, lower, len } = PasswordValidation.strong(
      form.value.pass
    );

    this.number = number;
    this.upper = upper;
    this.lower = lower;
    this.len = len;
  }

  onSubmit(form: any) {
    this._spinner.show();
    // Início da validação do formulário de registro de um usuário
    if (form.status == 'VALID' && this.validateConditions()) {
      if (this.isBR) {
        if (form.value.state == '' || form.value.city == '') {
          this.validateForm.flag = true;
          this.validateForm.message = 'Escolha o seu estado e a sua cidade!';
          this._spinner.hide();
          return;
        }
      }

      if (form.value.pass != form.value.pass_confirm) {
        this.validateForm.flag = true;
        this.validateForm.message = 'As senhas não são iguais!';
        this._spinner.hide();
        return;
      }

      // Valores obrigatórios
      this.user.name = form.value.name;
      this.user.birthday = new Date(form.value.birthday);
      this.user.email = form.value.email;
      this.user.password = form.value.pass;
      this.user.country = form.value.country;
      this.user.action = form.value.action;
      this.user.spiritCenter = form.value.spiritCenter;
      this.user.whatsapp = form.value.whatsapp;

      // Valores opcionais
      this.user.state = form.value.state || '';
      this.user.city = form.value.city || '';
      this.user.artisticFormation = form.value.artisticFormation || '';
      this.user.professionalArt = form.value.professionalArt || '';
      this.user.englishLevel = form.value.english || '';
      this.user.spanishLevel = form.value.spanish || '';
      this.user.otherLanguages = form.value.otherLanguage || '';
      this.user.isActive = true;
      this.user.isWorker = this.checkTernary(form.value.isWorker);
      this.user.isPlayer = this.checkTernary(form.value.isPlayer);
      this.user.isTheater = this.checkTernary(form.value.isTheater);
      this.user.isLiterature = this.checkTernary(form.value.isLiterature);
      this.user.isDancer = this.checkTernary(form.value.isDancer);
      this.user.isVisualArt = this.checkTernary(form.value.isVisualArt);
      this.user.isEFASCoordinator = this.checkTernary(
        form.value.isEFASCoordinator
      );
      this.user.isCONCAFRASCoordinator = this.checkTernary(
        form.value.isCONCAFRASCoordinator
      );

      // Instruments
      if (form.value.instruments != undefined) {
        this.user.instruments = this.getInstruments(form.value.instruments);
      }

      // Image
      this.user.image = new Document();

      this.validateForm.flag = false;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((response: any) => {
          let uid = response.user.uid;
          this.user.uid = uid;
          this._userService.register(this.user).subscribe({
            next: () => {
              this._spinner.hide();
              window.scroll(0, 0);
              this._router.navigate(['/']);
            },
          });
        });
    } else {
      this.validateForm.flag = true;
      this.validateForm.message = 'Preencha corretamente o formulário!';
      this._spinner.hide();
      return;
    }
  }

  getInstruments(instruments: string): string[] {
    let arr: string[] = [];

    let splitInstruments = instruments.split(',');
    splitInstruments.forEach((instrument) => {
      arr.push(instrument.trim());
    });

    return arr;
  }

  checkTernary(value: any): boolean {
    return value == true ? value : false;
  }

  validateCountry(country: string) {
    let countryLow = country.toLowerCase();

    if (countryLow == 'brasil') {
      this.isBR = true;
      return;
    }

    this.isBR = false;
    return;
  }
}
