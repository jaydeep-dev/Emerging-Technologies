import React, { lazy, Suspense } from 'react';
import './App.css';

const UserComponent = lazy(() => import('../../user-app/src/UserComponent'));

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Shell Application</h1>
        <Suspense fallback={<div>Loading User Component...</div>}>
          <UserComponent />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
