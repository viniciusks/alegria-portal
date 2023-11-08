import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, TreeNode } from 'primeng/api';
import storage from 'src/app/services/firebase/firebase-storage.service';

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
  enableUploadArchives: boolean;
  files: TreeNode[];

  constructor(
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService
  ) {
    this.baseUrl = 'downloads';
    this.typeContent = 'Escolha o tipo do conteúdo';
    this.downloadUrl = '';
    this.enableUploadArchives = false;
    this.files = [];
  }

  ngOnInit(): void {
    this._spinner.show();
    this.getAllFiles();
  }

  uploadFiles(event: any): void {
    this._messageService.clear();
    if (this.typeContent != 'Escolha o tipo do conteúdo') {
      let file: File = event.files[0];
      if (file) {
        this._spinner.show();
        let path = `${this.baseUrl}/${this.typeContent}`;
        let fileName = file.name.replace(/ /g, '_');

        storage
          .ref()
          .child(`${path}/${fileName}`)
          .put(file)
          .then(() => {
            storage
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

  getAllFiles(): void {
    // Todos os arquivos
    storage
      .ref()
      .child('downloads')
      .listAll()
      .then((downloadRef) => {
        let schema = {
          label: undefined,
          data: undefined,
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [],
        };

        // Referência das pastas dentro de downloads
        downloadRef.prefixes.forEach((responseFolder) => {
          let folderSchema = schema;

          // Passando por cada pasta
          responseFolder.listAll().then((folderRef) => {
            let nameFolder;

            // Passando por cada item
            folderRef.items.forEach((item) => {
              console.log(item.parent?.name);
              nameFolder = item.parent?.name;
            });

            folderSchema.label = nameFolder;
            folderSchema.data = nameFolder;
          });

          this.files.push(folderSchema);
        });
        this._spinner.hide();
      });
  }
}
