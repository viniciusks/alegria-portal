import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

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
    let files: File[] = event.files;
    let body: MyType = {
      path: `${this.baseUrl}/${this.typeContent}`,
      files: [],
    };

    files.forEach((file) => {
      let info = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      body.files.push(info);
      // https://www.youtube.com/watch?v=SWTJxnms_YA&ab_channel=DouglasHorstmann
    });

    console.log(body);

    this._utilsService.uploadFiles(body).subscribe((response) => {
      console.log(response);
    });
  }
}
