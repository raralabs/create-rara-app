import { lazy } from 'react';
const IndexPage = lazy(() => import('pages/Index'));

export const routes = [
  {
    path: '/',
    element: <IndexPage />,
  },
];

export default routes;
