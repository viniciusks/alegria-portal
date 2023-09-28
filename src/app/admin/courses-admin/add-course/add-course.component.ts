import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  providers: [MessageService, CourseService, NgxSpinnerService],
})
export class AddCourseComponent implements OnInit {
  course: Course;
  categories: any[];
  subcategories: any[];
  enableUploadArchives: boolean;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _courseService: CourseService,
    private _spinner: NgxSpinnerService
  ) {
    this.course = {
      name: '',
      description: '',
      category: {
        name: '',
        subcategories: [],
      },
      archives: [],
    };
    this.categories = [
      { name: 'CONCAFRAS', code: 'concafras' },
      { name: 'Encontro Fraterno Auta de Souza', code: 'efas' },
      { name: 'Noções Fundamentais Teóricas', code: 'nfed' },
      { name: 'Noções Fundamentais Oficinas', code: 'nfofiq' },
    ];
    this.subcategories = [
      { name: 'Tema específico', code: 'especifico' },
      { name: 'Tema histórico atual', code: 'atual' },
      { name: 'Tema livre', code: 'livre' },
      { name: 'Tema especial', code: 'especial' },
    ];
    this.enableUploadArchives = false;
  }

  ngOnInit(): void {
    console.log('[OK] AddCourseComponent');
  }

  onSubmit() {
    this._spinner.show();
    if (
      this.course.name == '' ||
      this.course.description == '' ||
      this.course.category.name == ''
    ) {
      this._spinner.hide();
      this._messageService.add({
        severity: 'error',
        summary: 'Falta informação',
        detail:
          'Preencha corretamente os campos solicitados. (Nome, descrição e categoria)',
      });
      return;
    }

    this._courseService.insertCourse(this.course).subscribe(() => {
      this._spinner.hide();
      window.scroll(0, 0);
      this._messageService.clear();
      this._messageService.add({
        severity: 'success',
        summary: 'Curso inserido com sucesso!',
        detail: 'Sendo redirecionado para a lista de cursos em 5 segundos.',
      });
      setTimeout(() => {
        this._router.navigate(['/admin/courses']);
      }, 5000);
    });
  }

  removeArchive(index: any) {
    this.course.archives.splice(index, 1);
  }

  addArchive() {
    this.course.archives.push({
      name: '',
      url: '',
    });
  }

  onChangeCategory(event: any) {
    this.course.category.name = event.target.value;

    if (
      this.course.category.name == this.categories[2].code ||
      this.course.category.name == this.categories[3].code
    ) {
      this.course.category.subcategories.splice(
        0,
        this.course.category.subcategories.length
      );
    }
  }

  onChangeSubcategory(event: any) {
    this.course.category.subcategories.push(event.target.value);
  }

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }
}
