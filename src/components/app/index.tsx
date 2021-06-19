import React from 'react';
import AppHeader from '../app-header';
import AppBody from '../app-body';
import style from './style.module.css';

const App = () => {
  return (
    <div className={style.app}>
      <AppHeader />
      <AppBody />
    </div>
  );
};

export default App;
