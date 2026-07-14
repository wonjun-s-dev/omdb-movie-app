import { Store } from '../core/core';

export interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: 'https://wonjun-s-dev.github.io/assets/img/prof_pic-480.webp',
  name: 'wonjun Seo',
  email: 'wonjun.s.dev@gmail.com',
  blog: 'https://wonjun-s-dev.github.io/',
  github: 'https://github.com/wonjun-s-dev',
  repository: 'https://github.com/wonjun-s-dev/omdb-movie-app',
});
