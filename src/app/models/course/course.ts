import { Archive } from '../archive';
import { CourseCategory } from './course-category';

export interface Course {
  name: string;
  description: string;
  category: CourseCategory;
  archives: Archive[];
}
