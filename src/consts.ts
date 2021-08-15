import { OrderStatus_t } from './types';

export const orderStatusToStatusTitleMap: {
  [key in OrderStatus_t]: string;
} = {
  [OrderStatus_t.created]: 'Создан',
  [OrderStatus_t.pending]: 'В работе',
  [OrderStatus_t.done]: 'Готов',
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
    orderDetails: 'Информация о заказе',
    orderId: 'Идентификатор заказа',
    orderIngredients: 'Состав',
    orderList: 'Лента заказов',
    ordersTotalCount: 'Выполнено за все время',
    ordersTodayTotalCount: 'Выполнено за сегодня',
    placeAnOrder: 'Оформить заказ',
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
