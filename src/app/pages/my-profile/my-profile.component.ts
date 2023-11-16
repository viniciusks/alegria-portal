import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [UserService, UtilsService, MessageService],
})
export class MyProfileComponent implements OnInit {
  user: User;
  isDisabled: boolean;
  infos: any;
  instruments: string;

  constructor(
    private _userService: UserService,
    private _utilsService: UtilsService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService
  ) {
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
    this.isDisabled = true;
    this.infos = {
      states: [],
      cities: [],
    };
    this.instruments = '';
  }

  ngOnInit(): void {
    this._spinner.show();
    console.log('[OK] MyProfileComponent');
    this.getUser();
  }

  getUser() {
    this._userService.getUser().subscribe((response: any) => {
      this.user = response.body.data;
      this.getStates();
    });
  }

  enableEdit() {
    this.isDisabled = this.isDisabled ? false : true;
  }

  getStates() {
    this._utilsService.getStates().subscribe((res: any) => {
      let states: any[] = [];
      let targetState = '';
      res.forEach((state: any) => {
        states.push(state.nome);
        if (this.user.state == state.nome) {
          targetState = state.sigla;
        }
      });
      this.infos.states = states;
      this.getCities(targetState);
    });
  }

  getCities(uf: any) {
    this._utilsService.getCities(uf).subscribe((res) => {
      let cities: any[] = [];
      res.forEach((city: any) => {
        cities.push(city.nome);
      });
      this.infos.cities = cities;
      this.getInstruments();
    });
  }

  getInstruments() {
    this.user.instruments.forEach((instrument, i) => {
      if (this.user.instruments.length == i + 1) {
        this.instruments += instrument;
      } else {
        this.instruments += `${instrument},`;
      }
    });
    this._spinner.hide();
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

  onSubmit() {
    this._spinner.show();
    this._messageService.clear();

    if (
      this.user.name == '' ||
      this.user.email == '' ||
      this.user.country == ''
    ) {
      this._spinner.hide();
      this._messageService.add({
        severity: 'error',
        summary: 'Dados incorretos',
        detail: 'Preencha corretamente os dados de nome, email e país.',
      });
      return;
    }

    this.user.instruments = [];
    this.instruments
      .trim()
      .split(',')
      .forEach((instrument) => {
        this.user.instruments.push(instrument);
      });

    let identity = this._userService.getIdentity();
    this._userService.updateUser(identity.uid, this.user).subscribe(() => {
      this._spinner.hide();
      window.scroll(0, 0);
      this._messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail:
          'Usuários atualizado com sucesso!',
      });
      this.isDisabled = true;
    });
  }
}
