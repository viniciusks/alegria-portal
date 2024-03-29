import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Kit } from 'src/app/models/kit';
import { KitService } from 'src/app/services/kit.service';

@Component({
  selector: 'app-edit-kit',
  templateUrl: './edit-kit.component.html',
  styleUrls: ['./edit-kit.component.css'],
  providers: [KitService, MessageService],
})
export class EditKitComponent implements OnInit {
  id: string;
  kit: Kit;

  constructor(
    private _kitService: KitService,
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.id = '';
    this.kit = {
      name: '',
      year: 0,
      description: '',
      archives: [],
    };
  }

  ngOnInit(): void {
    this._spinner.show();
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.getOneKit(this.id);
    });
  }

  getOneKit(id: string) {
    this._kitService.getOneKit(id).subscribe((response) => {
      if (response.status == 200) {
        this.kit = response.body.data;
      }
      this._spinner.hide();
    });
  }

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

    // if (this.kit.archive.name == '' || this.kit.archive.url == '') {
    //   this._spinner.hide();
    //   this._messageService.add({
    //     severity: 'error',
    //     summary: 'Falta o arquivo',
    //     detail: 'Escolha o arquivo para o kit.',
    //   });
    //   return;
    // }

    this._kitService.updateKit(this.id, this.kit).subscribe({
      next: () => {
        this._spinner.hide();
        window.scroll(0, 0);
        this._messageService.add({
          severity: 'success',
          summary: 'Kit atualizado com sucesso!',
          detail: 'Sendo redirecionado para a lista de kits em 5 segundos.',
        });
        setTimeout(() => {
          this._router.navigate(['/admin/kit']);
        }, 5000);
      },
    });
  }

  setFileDownloadUrl(info: any, index: any) {
    this.kit.archives[index].name = info.name;
    this.kit.archives[index].url = info.url;
  }

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }

  addArchive() {
    this.kit.archives.push({
      name: '',
      url: '',
    });
  }

  removeArchive(index: any) {
    this.kit.archives.splice(index, 1);
  }
}
