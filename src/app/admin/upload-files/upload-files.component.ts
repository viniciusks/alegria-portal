import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import firebase from 'src/app/services/firebase.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
  providers: [UtilsService, NgxSpinnerService],
})
export class UploadFilesComponent implements OnInit {
  baseUrl: string;
  typeContent: string;
  downloadUrl: string;

  constructor(
    private _utilsService: UtilsService,
    private _spinner: NgxSpinnerService
  ) {
    this.baseUrl = 'downloads';
    this.typeContent = 'Escolha o tipo do conteúdo';
    this.downloadUrl = '';
  }

  ngOnInit(): void {}

  uploadFiles(event: any): void {
    this._spinner.show();
    let file: File = event.files[0];

    if (file) {
      let path = `${this.baseUrl}/${this.typeContent}`;

      firebase
        .storage()
        .ref()
        .child(`${path}/${file.name}`)
        .put(file)
        .then(() => {
          firebase
            .storage()
            .ref()
            .child(`${path}/${file.name}`)
            .getDownloadURL()
            .then((url) => {
              this.downloadUrl = url;
              this._spinner.hide();
            });
        });
    }
  }
}
