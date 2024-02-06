import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-player-app',
  templateUrl: './player-app.component.html',
  styleUrls: ['./player-app.component.css'],
})
export class PlayerAppComponent implements OnInit {
  items: MenuItem[];

  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Alegria Player',
        items: [
          {
            label: 'Álbuns',
            icon: 'bi bi-music-note-list',
          },
        ],
      },
    ];
  }
}
