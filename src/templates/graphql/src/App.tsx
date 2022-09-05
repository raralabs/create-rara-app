import { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from 'routes';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Routes>
          {routes.map((path) => (
            <Route path={path.path} element={path.element} />
          ))}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
