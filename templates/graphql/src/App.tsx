import { Suspense } from 'react';

import { ReactLocation, Router, Navigate } from 'react-location';
import routes from 'routes';


const location = new ReactLocation();
function App() {
  return (
      <Suspense fallback={<Loader />}>
        <Router
          location={location}
          routes={routes}
        ></Router>
      </Suspense>
  );
}

export default App;
