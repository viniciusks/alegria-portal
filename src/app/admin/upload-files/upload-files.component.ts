import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() onDownloadUrlEmitter = new EventEmitter();
  baseUrl: string;
  typeContent: string;
  enableUploadArchives: boolean;
  files: TreeNode[];
  selectedFile: TreeNode;

  constructor(
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService
  ) {
    this.baseUrl = 'downloads';
    this.typeContent = 'Escolha o tipo do conteúdo';
    this.enableUploadArchives = false;
    this.files = [];
    this.selectedFile = {};
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
                let info = {
                  name: fileName,
                  url: url,
                };
                this._messageService.add({
                  severity: 'success',
                  summary: 'Upload finalizado',
                  detail: `O arquivo ${fileName} subiu com sucesso.`,
                });
                this.onDownloadUrlEmitter.emit(info);
                this.enableUploadArchives = true;
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
      .then((rootRef) => {
        // Referência das pastas dentro de downloads
        rootRef.prefixes.forEach((prefix) => {
          let folder = {
            data: prefix.name,
            label: prefix.name,
            expandedIcon: 'bi bi-folder2-open',
            collapsedIcon: 'bi bi-folder2',
            children: [],
          };
          // Passando por cada pasta
          prefix.listAll().then((folderRef) => {
            // Passando por cada item
            folderRef.items.forEach((item) => {
              let file = {
                data: item.name,
                label: item.name,
                icon: '',
                children: [],
              };

              if (file.data.endsWith('.pdf')) {
                file.icon = 'bi bi-file-earmark-pdf';
              } else if (file.data.endsWith('.docx')) {
                file.icon = 'bi bi-file-earmark-word';
              } else if (file.data.endsWith('.zip')) {
                file.icon = 'bi bi-file-earmark-zip';
              } else if (file.data.endsWith('.mp3')) {
                file.icon = 'bi bi-file-earmark-music';
              } else if (file.data.endsWith('.ppsm')) {
                file.icon = 'bi bi-file-earmark-ppt';
              } else {
                file.icon = 'bi bi-file-earmark-text';
              }

              folder.children.push(file as never);
            });
          });
          this.files.push(folder);
        });
        this._spinner.hide();
      });
  }

  nodeSelect(event: any): void {
    if (!this.hasChildren(event)) {
      let itemName = event.node.data;
      let folderName = event.node.parent.data;
      let path = `downloads/${folderName}/${itemName}`;

      storage
        .ref()
        .child(path)
        .getDownloadURL()
        .then((response) => {
          let info = {
            name: itemName,
            url: response,
          };
          this.onDownloadUrlEmitter.emit(info);
        });
    }
  }

  hasChildren(event: any) {
    return event.node.children.length > 0 ? true : false;
  }
}
