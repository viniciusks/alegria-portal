import { Archive } from './archive';

export interface Kit {
  name: string;
  year: number;
  description: string;
  archive: Archive;
}
