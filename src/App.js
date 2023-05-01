import React, { createContext, useContext } from 'react';
import './App.scss';
import Routes from './components/pages/Routes';

// -------------------------------------------------------------------------------------

export const PageNameContext = createContext();

// -------------------------------------------------------------------------------------

function App() {
  const [pageName, setPageName] = React.useState('');

  return (
    <PageNameContext.Provider value={{ pageName, setPageName }}>

      <div className="App">
        <Routes />
      </div>
    </PageNameContext.Provider>

  );
}

export default App;
