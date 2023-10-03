import { CourseSubcategory } from './course-subcategory';

export interface CourseCategory {
  name: string;
  code: string;
  subcategory: CourseSubcategory;
}
