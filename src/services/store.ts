import { configureStore } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { apiHostUrl } from './api';
import { socketMiddlewareFabric } from './middleware';
import {
  burgerReducer,
  ordersReducer,
  userReducer,
  urlAndWaActionTypesPairs,
} from './reducers';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      urlAndWaActionTypesPairs.map(([url, wsActionTypes]) =>
        socketMiddlewareFabric(
          `ws${`${apiHostUrl.replace(/^http/, '')}`}${url}`,
          wsActionTypes
        )
      )
    ),
  reducer: {
    burger: burgerReducer,
    orders: ordersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(
  func: (state: RootState) => T,
  cmp?: typeof shallowEqual
): T => useSelector(func, cmp);

export { store };
