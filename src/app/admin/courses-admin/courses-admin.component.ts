import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['./courses-admin.component.css'],
  providers: [CourseService, ConfirmationService, MessageService],
})
export class CoursesAdminComponent implements OnInit {
  private courses: Course[];

  constructor(
    private _spinner: NgxSpinnerService,
    private _courseService: CourseService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.courses = [];
  }

  ngOnInit(): void {
    this._spinner.show();
    this.getCourses();
  }

  getCourse() {
    return this.courses;
  }

  getCourses() {
    this._courseService.getCourses().subscribe({
      next: (courses: any) => {
        this._spinner.hide();
        this.courses = courses.data;
      },
      error: (error) => {
        this._spinner.hide();
        console.log(`[ERROR] ${error}`);
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

  confirmDelete(id: string) {
    this._confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse curso?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._courseService.deleteCourse(id).subscribe((response) => {
          let status = response.status;
          if (status == 200) {
            this._messageService.clear();
            this._messageService.add({
              severity: 'info',
              summary: 'Deletado',
              detail: 'Você aceitou deletar este curso.',
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this._messageService.clear();
            this._messageService.add({
              severity: 'error',
              summary: 'Rejeitado',
              detail: 'Você não aceitou deletar este curso.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this._messageService.clear();
            this._messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Você desistiu de deletar este curso.',
            });
            break;
        }
      },
    });
  }
}
