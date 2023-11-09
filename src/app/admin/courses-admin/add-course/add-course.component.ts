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
        code: '',
        subcategory: {
          name: '',
          code: '',
        },
      },
      archives: [],
    };
    this.categories = [
      { name: 'CONCAFRAS', code: 'concafras' },
      { name: 'Encontro Fraterno Auta de Souza', code: 'efas' },
      { name: 'Núcleo de Formação - Estudo Doutrinário', code: 'nfed' },
      { name: 'Núcleo de Formação - Oficinas', code: 'nfofiq' },
    ];
    this.subcategories = [
      { name: 'Tema específico', code: 'especifico' },
      { name: 'Tema histórico atual', code: 'atual' },
      { name: 'Tema livre', code: 'livre' },
      { name: 'Tema especial', code: 'especial' },
    ];
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
    let select = event.target;
    let option = select.children[select.selectedIndex];
    this.course.category.name = option.textContent;
    this.course.category.code = option.value;

    if (
      this.course.category.name == this.categories[2].code ||
      this.course.category.name == this.categories[3].code
    ) {
      this.course.category.subcategory.name = '';
      this.course.category.subcategory.code = '';
    }
  }

  onChangeSubcategory(event: any) {
    let select = event.target;
    let option = select.children[select.selectedIndex];
    this.course.category.subcategory.name = option.textContent;
    this.course.category.subcategory.code = option.value;
  }

  goToInside(route: string, id: string = '') {
    if (id != '') {
      this._router.navigate([`${route}/${id}`]);
    } else {
      this._router.navigate([route]);
    }
  }

  setFileDownloadUrl(info: any, index: any) {
    this.course.archives[index].name = info.name;
    this.course.archives[index].url = info.url;
  }
}
