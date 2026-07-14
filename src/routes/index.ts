import { createRouter } from '../core/core';
import About from './About';
import NotFound from './NotFound';

export default createRouter([
  { path: '#/about', component: About },
  { path: '.*', component: NotFound },
]);
