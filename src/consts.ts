import { OrderStatus_t } from './types';

export const apiHostUrl = 'https://norma.nomoreparties.space';

export const orderStatusToStatusTitleMap: {
  [key in keyof typeof OrderStatus_t]: string;
} = {
  BEING_COOKED: 'Ваш заказ начали готовить',
  COOKED: 'Заказ приготовлен',
  BEING_DELIVERED: 'Ваш заказ доставляется',
  DELIVERED: 'Заказ доставлен',
};
