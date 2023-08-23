import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import firebase from 'src/app/services/firebase.service';

type MyType = {
  path: string;
  files: any[];
};

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
  providers: [UtilsService],
})
export class UploadFilesComponent implements OnInit {
  baseUrl: string;
  typeContent: string;

  constructor(private _utilsService: UtilsService) {
    this.baseUrl = 'downloads';
    this.typeContent = 'Escolha o tipo do conteúdo';
  }

  ngOnInit(): void {}

  uploadFiles(event: any): void {
    let file: File = event.files[0];

    if (file) {
      let body = {
        path: `${this.baseUrl}/${this.typeContent}`,
        file,
      };

      console.log(body);

      firebase
        .storage()
        .ref()
        .child(`${body.path}/${body.file.name}`)
        .put(body.file)
        .then((result) => {
          console.log(result);
        });

      // files.forEach((file) => {
      //   let info = {
      //     name: file.name,
      //     size: file.size,
      //     type: file.type,
      //   };
      //   body.files.push(info);
      //   // https://www.youtube.com/watch?v=SWTJxnms_YA&ab_channel=DouglasHorstmann
      // });
    }
  }
}
