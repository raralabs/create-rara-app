import { lazy } from 'react';
const IndexPage = lazy(() => import('pages/Index'));

export const routes = [
  {
    path: '/index',
    name: 'Index',
    element: IndexPage,
  },
];

export default routes;
