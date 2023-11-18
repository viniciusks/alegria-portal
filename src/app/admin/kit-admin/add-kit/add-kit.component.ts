import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Kit } from 'src/app/models/kit';
import { KitService } from 'src/app/services/kit.service';

@Component({
  selector: 'app-add-kit',
  templateUrl: './add-kit.component.html',
  styleUrls: ['./add-kit.component.css'],
  providers: [MessageService, KitService],
})
export class AddKitComponent implements OnInit {
  kit: Kit;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _kitService: KitService,
    private _spinner: NgxSpinnerService
  ) {
    this.kit = {
      name: '',
      year: 0,
      description: '',
      archive: {
        name: '',
        url: '',
      },
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    this._spinner.show();
    this._messageService.clear();

    if (this.kit.year == 0) {
      this._spinner.hide();
      this._messageService.add({
        severity: 'error',
        summary: 'Informação incorreta',
        detail: 'O valor de ano não pode ser 0 (zero).',
      });
      return;
    }

    if (this.kit.name == '' || this.kit.description == '') {
      this._spinner.hide();
      this._messageService.add({
        severity: 'error',
        summary: 'Falta informação',
        detail:
          'Preencha corretamente os campos solicitados. (Nome, descrição e categoria)',
      });
      return;
    }

    if (this.kit.archive.name == '' || this.kit.archive.url == '') {
      this._spinner.hide();
      this._messageService.add({
        severity: 'error',
        summary: 'Falta o arquivo',
        detail: 'Escolha o arquivo para o kit.',
      });
      return;
    }

    this._kitService.insertKit(this.kit).subscribe({
      next: (response) => {
        this._spinner.hide();
        window.scroll(0, 0);
        this._messageService.add({
          severity: 'success',
          summary: 'Kit inserido com sucesso!',
          detail: 'Sendo redirecionado para a lista de kits em 5 segundos.',
        });
        setTimeout(() => {
          this._router.navigate(['/admin/kit']);
        }, 5000);
      },
    });
  }

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }

  setFileDownloadUrl(info: any) {
    this.kit.archive.name = info.name;
    this.kit.archive.url = info.url;
  }
}
