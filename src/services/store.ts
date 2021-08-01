import { configureStore } from '@reduxjs/toolkit';
import { burgerReducer } from './reducers';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    burger: burgerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(func: (state: RootState) => T): T =>
  useSelector(func);

export { store };
