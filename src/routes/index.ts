import { createRouter } from '../core/core';
import NotFound from './NotFound';

export default createRouter([
  // { path: '#/', component: Home },
  { path: '.*', component: NotFound },
]);
