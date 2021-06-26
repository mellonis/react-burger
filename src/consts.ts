import { OrderStatus_t } from './types';

export const apiHostUrl = 'https://norma.nomoreparties.space';

export const orderStatusToStatusTitleMap: {
  [key in OrderStatus_t]: string;
} = {
  [OrderStatus_t.BEING_COOKED]: 'Ваш заказ начали готовить',
  [OrderStatus_t.COOKED]: 'Заказ приготовлен',
  [OrderStatus_t.BEING_DELIVERED]: 'Ваш заказ доставляется',
  [OrderStatus_t.DELIVERED]: 'Заказ доставлен',
};

const allLexemes = {
  ru: {
    assembleABurger: 'Соберите бургер',
    buns: 'Булки',
    burgerFillings: 'Начинки',
    constructor: 'Конструктор',
    orderId: 'Идентификатор заказа',
    orderList: 'Лента заказов',
    sauces: 'Соусы',
    placeAnOrder: 'Оформиль заказ',
    profile: 'Личный кабинет',
  },
};

export const lexemes = allLexemes.ru;
