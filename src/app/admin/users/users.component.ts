import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    UserService,
    NgxSpinnerService,
    ConfirmationService,
    MessageService,
  ],
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this._spinner.show();
    this.getUsersFromDB();
  }

  getUsersFromDB(): void {
    this._userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.data;
        console.log(this.users);
        this._spinner.hide();
      },
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  confirmDelete(id: string) {
    this._confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse kit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this._kitService.deleteKit(id).subscribe((response) => {
        //   let status = response.status;
        //   if (status == 200) {
        //     this._messageService.clear();
        //     this._messageService.add({
        //       severity: 'info',
        //       summary: 'Deletado',
        //       detail: 'Você aceitou deletar este kit.',
        //     });
        //     setTimeout(() => {
        //       location.reload();
        //     }, 2000);
        //   }
        // });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.clear();
            this._messageService.add({
              severity: 'error',
              summary: 'Rejeitado',
              detail: 'Você não aceitou deletar este kit.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this._messageService.clear();
            this._messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Você desistiu de deletar este kit.',
            });
            break;
        }
      },
    });
  }

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
