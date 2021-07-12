import { Ingredient_t, OrderDetails_t, OrderStatus_t } from '../../types';

export const apiHostUrl = 'https://norma.nomoreparties.space';

export const fetchIngredients = async (): Promise<Ingredient_t[]> => {
  const response = await fetch(`${apiHostUrl}/api/ingredients`);
  const result = await response.json();

  if (result.success === true) {
    return result.data;
  } else {
    throw new Error("Can't get data from server");
  }
};

export const placeAnOrder = async (
  ingredients: Ingredient_t['_id'][]
): Promise<OrderDetails_t> => {
  const response = await fetch(`${apiHostUrl}/api/orders`, {
    body: JSON.stringify({ ingredients }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success === true) {
    return {
      id: result.order.number,
      message: 'Дождитесь готовности на орбитальной станции',
      status: OrderStatus_t.BEING_COOKED,
    };
  } else {
    throw new Error("Can't get data from server");
  }
};
