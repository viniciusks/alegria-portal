import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  course: Course;
  categories: any[];
  subcategories: any[];

  constructor(private _router: Router) {
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
  }

  ngOnInit(): void {
    console.log('[OK] AddCourseComponent');
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
