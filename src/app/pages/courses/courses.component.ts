import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Course } from 'src/app/models/course/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CourseService],
})
export class CoursesComponent implements OnInit {
  courses: any[];
  coursesConcafras: any[];
  coursesEfas: any[];
  coursesNfed: any[];
  coursesNfofiq: any[];

  constructor(
    private _courseService: CourseService,
    private _spinner: NgxSpinnerService
  ) {
    this.courses = [];
    this.coursesConcafras = [];
    this.coursesEfas = [];
    this.coursesNfed = [];
    this.coursesNfofiq = [];
  }

  ngOnInit(): void {
    this._spinner.show();
    this.getCourses();
  }

  downloadArchive(url: string) {
    // location.href = url;
    window.open(url, '_blank');
  }

  getCourses() {
    this._courseService.getCourses().subscribe((response: any) => {
      this.courses = response.data;
      this.courses.forEach((data) => {
        let course: Course = data.course;
        switch (course.category.code) {
          case 'concafras':
            this.coursesConcafras.push(course);
            break;
          case 'efas':
            this.coursesEfas.push(course);
            break;
          case 'nfed':
            this.coursesNfed.push(course);
            break;
          case 'nfofiq':
            this.coursesNfofiq.push(course);
            break;
        }
      });
      this._spinner.hide();
    });
  }
}
