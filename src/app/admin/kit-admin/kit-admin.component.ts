import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Kit } from 'src/app/models/kit';
import { KitService } from 'src/app/services/kit.service';

@Component({
  selector: 'app-kit-admin',
  templateUrl: './kit-admin.component.html',
  styleUrls: ['./kit-admin.component.css'],
  providers: [ConfirmationService, MessageService, KitService],
})
export class KitAdminComponent implements OnInit {
  private kits: Kit[];

  constructor(
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router,
    private _kitService: KitService,
    private _spinner: NgxSpinnerService
  ) {
    this.kits = [];
  }

  ngOnInit(): void {
    console.log('[OK] KitAdminComponent');
    this._spinner.show();
    this.getKits();
  }

  getKit() {
    return this.kits;
  }

  getKits() {
    this._kitService.getKits().subscribe({
      next: (kits: any) => {
        this._spinner.hide();
        this.kits = kits.data;
      },
      error: (error) => {
        this._spinner.hide();
        console.log(`[ERROR] ${error}`);
      },
    });
  }

  confirmDelete(id: string) {}

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }

  goTo(route: string) {
    window.open(route, '_blank');
  }
}
