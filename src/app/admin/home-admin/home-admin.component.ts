import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  items: MenuItem[];

  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Início',
        items: [
          {
            label: 'Acessar',
            icon: 'pi pi-fw pi-home',
            routerLink: '/admin',
          },
        ],
      },
      {
        label: 'Usuários',
        items: [
          {
            label: 'Acessar',
            icon: 'pi pi-pw pi-user',
            routerLink: '/admin',
          },
        ],
      },
      {
        label: 'Músicas',
        icon: 'pi pi-fw pi-play',
        items: [
          {
            label: 'Acervo - In build',
            icon: 'pi pi-fw pi-list',
            // TODO: Colocar routerLink
          },
          {
            label: 'Editor - In build',
            icon: 'pi pi-fw pi-file-edit',
            // TODO: Colocar routerLink
          },
        ],
      },
      {
        label: 'Player',
        items: [
          {
            label: 'Acessar',
            icon: 'pi pi-fw pi-volume-up',
            routerLink: '/admin/player',
          },
        ],
      },
    ];
  }
}
