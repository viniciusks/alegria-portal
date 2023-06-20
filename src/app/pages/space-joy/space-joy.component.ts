import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-space-joy',
  templateUrl: './space-joy.component.html',
  styleUrls: ['./space-joy.component.css'],
  providers: [UserService],
})
export class SpaceJoyComponent implements OnInit {
  currentContent: any;
  contentsKit: any;
  flagContentView: boolean;
  user: User;

  constructor(private _userService: UserService) {
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
    this.user = new User(
      '',
      new Date(),
      '',
      '',
      '',
      '',
      '',
      ['ALEGRIA_USER'],
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      []
    );
  }

  ngOnInit(): void {
    console.log('[OK] Component: space-joy.');
    this._userService.getUser().subscribe({
      next: (response: any) => {
        let data = response.body.data;
        this.user = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
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
