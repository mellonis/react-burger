import { OrderStatus_t } from './types';

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
    bottom: 'низ',
    buns: 'Булки',
    burgerFillings: 'Начинки',
    calories: 'Калории, ккал',
    carbohydrates: 'Углеводы, г',
    constructor: 'Конструктор',
    fat: 'Жиры, г',
    ingredientDetails: 'Детали ингредиента',
    orderId: 'Идентификатор заказа',
    orderList: 'Лента заказов',
    placeAnOrder: 'Оформиль заказ',
    profile: 'Личный кабинет',
    proteins: 'Белки, г',
    sauces: 'Соусы',
    top: 'верх',
    forms: {
      __common__: {
        __errors__: {
          required: 'Заполните обязательное поле',
          passwordLength: 'Пароль должен содержать как минимум 6 символов',
        },
        doHidePassword: 'Скрыть пароль',
        doLogin: 'Войти',
        doRegister: 'Зарегистрироваться',
        doShowPassword: 'Показать пароль',
        email: 'E-mail',
        haveYouRememberedYourPassword: 'Вспомнили пароль?',
        name: 'Имя',
        password: 'Пароль',
        resetForm: 'Отмена',
      },
      forgotPassword: {
        doResetPassword: 'Восстановить',
        provideYourEmail: 'Укажите e-mail',
        title: 'Восстановление пароля',
      },
      login: {
        areYouForgetYourPassword: 'Забыли пароль?',
        areYouTheNewUser: 'Вы новый пользователь?',
        doResetYourPassword: 'Восстановить пароль',
        title: 'Вход',
      },
      profile: {
        doEdit: 'Изменить',
        email: 'Логин',
      },
      register: {
        areYouRegisteredAlready: 'Уже зарегистрированы?',
        title: 'Регистрация',
      },
      resetPassword: {
        doReset: 'Сохранить',
        provideApprovalCode: 'Введите код из письма',
        provideYourNewPassword: 'Введите новый пароль',
        title: 'Восстановление пароля',
      },
    },
  },
};

export const lexemes = allLexemes.ru;
