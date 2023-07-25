import { Music } from './music';

export interface Album {
  name: string;
  owner: string;
  musics: Music[];
  link: string;
}
