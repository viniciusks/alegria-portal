import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-joy',
  templateUrl: './space-joy.component.html',
  styleUrls: ['./space-joy.component.css'],
})
export class SpaceJoyComponent implements OnInit {
  currentContent: any;
  contentsKit: any;
  flagContentView: boolean;

  constructor() {
    this.currentContent = {};
    this.flagContentView = false;
    this.contentsKit = {
      '2022': {},
      '2023': {
        pdf: 'https://www.ocentroespirita.com/alegriacrista/download/kit-treinamento/2023/KIT%20DE%20TREINAMENTO%20ALEGRIA%20CRIST%C3%83%20CONCAFRAS%202023.pdf',
        word: 'https://www.ocentroespirita.com/alegriacrista/download/kit-treinamento/2023/KIT%20DE%20TREINAMENTO%20ALEGRIA%20CRIST%C3%83%20CONCAFRAS%202023.docx',
        audios:
          'https://www.ocentroespirita.com/alegriacrista/download/kit-treinamento/2023/audios.zip',
      },
    };
  }

  ngOnInit(): void {
    console.log('[OK] Component: space-joy.');
  }

  chooseKit(year: string) {
    if (this.flagContentView) {
      this.flagContentView = false;
      this.currentContent = {};
    } else {
      this.flagContentView = true;
      this.currentContent = this.contentsKit[year];
    }
  }
}
