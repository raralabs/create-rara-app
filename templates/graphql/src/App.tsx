import { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';

import { ReactLocation, Router } from 'react-location';
import routes from 'routes';

const location = new ReactLocation();
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router location={location} routes={routes}></Router>
    </Suspense>
  );
}

export default App;
