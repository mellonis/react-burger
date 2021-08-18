import cs from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { lexemes } from '../../consts';
import { useOrderIngredients } from '../../hooks';
import { formatOrderDate } from '../../helpers';
import { useAppSelector } from '../../services/store';
import { Amount } from '../amount';
import { OrderStatus } from '../order-status';
import { IngredientAndPrice } from './ingredients-and-price';
import orderDetailsStyles from './style.module.css';

const orderDetailsClassname = 'order-details';

const OrderDetails = () => {
  const { id } = useParams() as { id: string };
  const orders = useAppSelector((state) => state.orders.orders);
  const order = orders.find(({ _id }) => id === _id)!;
  const { ingredientQuantityPairs, isItValid, totalPrice } =
    useOrderIngredients({
      order,
    });

  if (!order) {
    return null;
  }

  return (
    <div className={orderDetailsStyles[orderDetailsClassname]}>
      <div
        className={cs(
          orderDetailsStyles[`${orderDetailsClassname}__number`],
          'text text_type_digits-default'
        )}
      >
        #{order.number}
      </div>
      <div className={'pt-10'} />
      <div className={'text text_type_main-medium'}>{order.name}</div>
      <div className={'pt-3'} />
      <OrderStatus status={order.status} />
      <div className={'pt-15'} />
      <div className={'text text_type_main-medium'}>
        {lexemes.orderIngredients}:
      </div>
      <div className={'pt-6'} />
      {isItValid ? (
        <ul
          className={cs(
            orderDetailsStyles[`${orderDetailsClassname}__ingredients`],
            'custom-scroll'
          )}
        >
          {ingredientQuantityPairs.map(([ingredient, quantity], ix) => (
            <React.Fragment key={ix}>
              <IngredientAndPrice ingredient={ingredient} quantity={quantity} />
              {ix + 1 < ingredientQuantityPairs.length ? (
                <div className={'pt-4'} />
              ) : null}
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <div className={'text text_color_error'}>{lexemes.noInformation}</div>
      )}
      <div className={'pt-10'} />
      <div
        className={cs(
          orderDetailsStyles[
            `${orderDetailsClassname}__date-and-price-wrapper`
          ],
          'mr-6'
        )}
      >
        <div
          className={cs(
            orderDetailsStyles[`${orderDetailsClassname}__date`],
            'text text_color_inactive'
          )}
        >
          {formatOrderDate(order.createdAt)}
        </div>
        {isItValid ? (
          <div
            className={orderDetailsStyles[`${orderDetailsClassname}__price`]}
          >
            <Amount amount={totalPrice} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { OrderDetails };
