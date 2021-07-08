import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers';

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
