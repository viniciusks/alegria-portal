import { Component, OnInit } from '@angular/core';
import { Music } from '../models/music';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-player-app',
  templateUrl: './player-app.component.html',
  styleUrls: ['./player-app.component.css'],
  providers: [AlbumService],
})
export class PlayerAppComponent implements OnInit {
  music: Music;

  constructor(private _albumService: AlbumService) {
    this.music = {
      title: '',
      artist: '',
      cover: '',
      file: '',
    };
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this._albumService.getAlbums().subscribe((response: any) => {
      this.music = response.data[0].album.musics[0];
    });
  }
}
