import { Dispatch, MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';
import { Action, Middleware } from 'redux';
import { AccessSchemaWithToken } from '../api';

interface WsGeneralActionPayload {
  message?: {};
}

export enum WsActionType {
  wsCloseConnection = 'wsCloseConnection',
  wsConnectionSuccess = 'wsConnectionSuccess',
  wsConnectionError = 'wsConnectionError',
  wsConnectionClose = 'wsConnectionClose',
  wsGetMessage = 'wsGetMessage',
  wsOpenConnection = 'wsOpenConnection',
  wsSendMessage = 'wsSendMessage',
}

export type WsActionTypes = {
  [key in WsActionType]: string;
};

export const socketMiddlewareFabric = (
  url: string,
  wsActionTypes: WsActionTypes
): Middleware => {
  return (
    store: MiddlewareAPI<Dispatch<Action<WsActionTypes[keyof WsActionTypes]>>>
  ) => {
    let socket: WebSocket | undefined;

    return (next) =>
      (
        action: PayloadAction<
          WsGeneralActionPayload,
          WsActionTypes[keyof WsActionTypes]
        >
      ) => {
        const { dispatch } = store;
        const { type, payload } = action;

        switch (type) {
          case wsActionTypes.wsOpenConnection: {
            const { auth } = (payload ?? {}) as {
              auth?: AccessSchemaWithToken;
            };
            const { accessToken } = (auth ?? {}) as AccessSchemaWithToken;

            socket = new WebSocket(
              `${url}${accessToken ? `?token=${accessToken}` : ''}`
            );
            socket.onopen = () => {
              dispatch({
                type: wsActionTypes.wsConnectionSuccess,
              });
            };
            socket.onmessage = (event) => {
              const { data: serializedData } = event;
              const data = JSON.parse(serializedData);

              dispatch({
                type: wsActionTypes.wsGetMessage,
                payload: data,
              });
            };
            socket.onerror = () => {
              dispatch({
                type: wsActionTypes.wsConnectionError,
              });
            };
            socket.onclose = () => {
              dispatch({
                type: wsActionTypes.wsConnectionClose,
              });
            };
            break;
          }
          case wsActionTypes.wsCloseConnection:
            socket?.close();
            socket = undefined;
            break;
          case wsActionTypes.wsSendMessage: {
            const { message } = payload;

            socket?.send(JSON.stringify(message));
            break;
          }
        }

        next(action);
      };
  };
};
