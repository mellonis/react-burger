import React from 'react';
import AppHeader from '../AppHeader';
import AppBody from '../AppBody';
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
