import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import Routes from './components/pages/Routes';
import { getCartDetails } from './redux/reducers/cartSlice';
import AxiosInstance from './axiosInstance';
import { fetchUserData } from './redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

// -------------------------------------------------------------------------------------

export const PageNameContext = createContext();

// -------------------------------------------------------------------------------------

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
 
    dispatch(fetchUserData())
  }, []);
  

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
