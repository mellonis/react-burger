import React, { useCallback, useContext, useState } from 'react';
import { OrderDetails_t, OrderStatus_t } from '../../types';
import { apiHostUrl } from '../../consts';

export type useOrderContextValueReturnValue_t = {
  orderDetails: OrderDetails_t | null;
  placeAnOrder: (ingredients: string[]) => Promise<void>;
};

export const OrderContext = React.createContext<
  useOrderContextValueReturnValue_t
>({ orderDetails: null, placeAnOrder: () => Promise.resolve() });

export const useOrderContext = () => useContext(OrderContext);

export const getNewOrderId = async (ingredients: string[]): Promise<number> => {
  const response = await fetch(`${apiHostUrl}/api/orders`, {
    body: JSON.stringify({ ingredients }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success === true) {
    return result.order.number;
  } else {
    throw new Error("Can't get data from server");
  }
};

export const useOrderContextValue = (): useOrderContextValueReturnValue_t => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails_t | null>(null);

  const placeAnOrder = useCallback(async (ingredients) => {
    setOrderDetails(null);

    getNewOrderId(ingredients)
      .then((orderId) => {
        setOrderDetails({
          id: orderId,
          message: 'Дождитесь готовности на орбитальной станции',
          status: OrderStatus_t.BEING_COOKED,
        });
      })
      .catch(console.error);
  }, []);

  return { orderDetails, placeAnOrder };
};
