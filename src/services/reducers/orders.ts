import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Order } from '../../types';
import { generateActionTypes, getAccessSchemaAndToken } from '../helpers';
import { WsActionTypes } from '../middleware';

const initialState: Readonly<{
  orders: Order[];
  total?: number;
  totalToday?: number;
  userOrders: Order[];
}> = {
  orders: [],
  userOrders: [],
};

const chunkCodeToUrlMap: {
  orders: string;
  userOrders: string;
} = {
  orders: '/orders/all',
  userOrders: '/orders',
};

type ChunkCodeToChunkWsDataMap = {
  [key in keyof typeof chunkCodeToUrlMap]: {
    subscribe: AsyncThunk<void, void, {}>;
    unsubscribe: AsyncThunk<void, void, {}>;
    url: string;
    wsActionTypes: WsActionTypes;
  };
};

const chunkCodeToChunkWsDataMap: ChunkCodeToChunkWsDataMap = Object.entries(
  chunkCodeToUrlMap
).reduce((result, [key, url]) => {
  const wsActionTypes = generateActionTypes();

  result[key as keyof typeof chunkCodeToUrlMap] = {
    subscribe: createAsyncThunk(
      `orders/${key}/subscribe`,
      (_, { dispatch }) => {
        if (key === 'orders') {
          dispatch({ type: wsActionTypes.wsOpenConnection });
        }
        if (key === 'userOrders') {
          const { accessSchema, accessToken } = getAccessSchemaAndToken();

          if (!accessSchema || !accessToken) {
            throw new Error('Action cannot be handled');
          }

          dispatch({
            type: wsActionTypes.wsOpenConnection,
            payload: { auth: { accessSchema, accessToken } },
          });
        }
      }
    ),
    unsubscribe: createAsyncThunk(
      `orders/${key}/unsubscribe`,
      (_, { dispatch }) => {
        dispatch({
          type: wsActionTypes.wsCloseConnection,
        });
      }
    ),
    url,
    wsActionTypes,
  };

  return result;
}, {} as ChunkCodeToChunkWsDataMap);

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    [chunkCodeToChunkWsDataMap.orders.wsActionTypes.wsGetMessage](
      state,
      {
        payload: { success, orders, total, totalToday },
      }: PayloadAction<{
        success: boolean;
        orders?: Order[];
        total?: number;
        totalToday?: number;
      }>
    ) {
      if (success) {
        state.orders = orders!;
        state.total = total!;
        state.totalToday = totalToday!;
      }
    },
    [chunkCodeToChunkWsDataMap.userOrders.wsActionTypes.wsGetMessage](
      state,
      {
        payload: { success, orders },
      }: PayloadAction<{
        success: boolean;
        orders?: Order[];
        total?: number;
        totalToday?: number;
      }>
    ) {
      if (success) {
        state.userOrders = orders!;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(
      chunkCodeToChunkWsDataMap.orders.subscribe.pending,
      () => {}
    );
    builder.addCase(
      chunkCodeToChunkWsDataMap.userOrders.subscribe.pending,
      () => {}
    );
  },
});

const { reducer } = slice;

export const urlAndWaActionTypesPairs = Object.values(chunkCodeToChunkWsDataMap)
  .map((chunkWsData) => ({
    ...chunkWsData,
    wsActionTypes: Object.fromEntries(
      Object.entries(chunkWsData.wsActionTypes).map(
        ([waActionType, actionType]) => [
          waActionType,
          slice.actions[actionType]
            ? slice.actions[actionType].type
            : actionType,
        ]
      )
    ) as WsActionTypes,
  }))
  .map(({ url, wsActionTypes }): [string, WsActionTypes] => [
    url,
    wsActionTypes,
  ]);

export { reducer as ordersReducer };

export const subscribeForOrders = chunkCodeToChunkWsDataMap.orders.subscribe;
export const subscribeForUserOrders =
  chunkCodeToChunkWsDataMap.userOrders.subscribe;
export const unsubscribeForUserOrders =
  chunkCodeToChunkWsDataMap.userOrders.unsubscribe;
