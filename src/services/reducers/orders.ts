import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';
import { generateActionTypes } from '../helpers';
import { WsActionTypes } from '../middleware';

const initialState: Readonly<{
  orders: Order[];
  userOrders: Order[];
}> = {
  orders: [],
  userOrders: [],
};

const chunkCodeToUrlMap: { orders: string; userOrders: string } = {
  orders: '/orders/all',
  userOrders: '/orders/all',
};

type ChunkCodeToChunkWsDataMap = {
  [key in keyof typeof chunkCodeToUrlMap]: {
    url: string;
    wsActionTypes: WsActionTypes;
    init: any;
  };
};

const chunkCodeToChunkWsDataMap: ChunkCodeToChunkWsDataMap = Object.entries(
  chunkCodeToUrlMap
).reduce((result, [key, url]) => {
  const wsActionTypes = generateActionTypes();

  result[key as keyof typeof chunkCodeToUrlMap] = {
    init: createAsyncThunk(`orders/${key}/init`, (a, { dispatch }) =>
      dispatch({ type: wsActionTypes.wsConnectionStart })
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
        payload: { success, orders },
      }: PayloadAction<{ success: boolean; orders?: Order[] }>
    ) {
      if (success) {
        state.orders = orders!;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(chunkCodeToChunkWsDataMap.orders.init.pending, () => {});
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

export const subscribeForOrders = chunkCodeToChunkWsDataMap.orders.init;
