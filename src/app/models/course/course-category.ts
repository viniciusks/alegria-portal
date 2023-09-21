import { CourseSubcategories } from './course-subcategories';

export interface CourseCategory {
  name: string;
  subcategories: CourseSubcategories[];
}
