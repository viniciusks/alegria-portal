import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Kit } from 'src/app/models/kit';

@Component({
  selector: 'app-kit-admin',
  templateUrl: './kit-admin.component.html',
  styleUrls: ['./kit-admin.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class KitAdminComponent implements OnInit {
  private kits: Kit[];

  constructor(
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.kits = [];
  }

  ngOnInit(): void {
    console.log('[OK] KitAdminComponent');
  }

  getKits() {
    return this.kits;
  }

  confirmDelete(id: string) {}

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }
}
