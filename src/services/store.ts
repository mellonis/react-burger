import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { burgerReducer, userReducer } from './reducers';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    burger: burgerReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(func: (state: RootState) => T): T =>
  useSelector(func);

export { store };
