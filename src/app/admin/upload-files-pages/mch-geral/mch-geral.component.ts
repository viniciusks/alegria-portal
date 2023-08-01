import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mch-geral',
  templateUrl: './mch-geral.component.html',
  styleUrls: ['./mch-geral.component.css'],
})
export class MchGeralComponent implements OnInit {
  ngOnInit(): void {}

  myUploader(event: any) {
    console.log(event);
  }
}
