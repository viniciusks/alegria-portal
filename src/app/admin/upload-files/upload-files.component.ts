import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import firebase from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
  providers: [NgxSpinnerService, MessageService],
})
export class UploadFilesComponent implements OnInit {
  baseUrl: string;
  typeContent: string;
  downloadUrl: string;

  constructor(
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService
  ) {
    this.baseUrl = 'downloads';
    this.typeContent = 'Escolha o tipo do conteúdo';
    this.downloadUrl = '';
  }

  ngOnInit(): void {}

  uploadFiles(event: any): void {
    this._messageService.clear();
    if (this.typeContent != 'Escolha o tipo do conteúdo') {
      let file: File = event.files[0];
      if (file) {
        this._spinner.show();
        let path = `${this.baseUrl}/${this.typeContent}`;
        let fileName = file.name.replace(/ /g, '_');

        firebase
          .storage()
          .ref()
          .child(`${path}/${fileName}`)
          .put(file)
          .then(() => {
            firebase
              .storage()
              .ref()
              .child(`${path}/${fileName}`)
              .getDownloadURL()
              .then((url) => {
                this.downloadUrl = url;
                this._messageService.add({
                  severity: 'success',
                  summary: 'Upload finalizado',
                  detail: `O arquivo ${fileName} subiu com sucesso.`,
                });
                this._spinner.hide();
              });
          });
      }
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Caminho inválido',
        detail: 'Selecione o caminho principal corretamente.',
      });
    }
  }
}
