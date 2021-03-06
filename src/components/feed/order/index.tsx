import cs from 'classnames';
import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { formatOrderDate } from '../../../helpers';
import { Order as OrderType } from '../../../types';
import { OrderStatus } from '../../order-status';
import { IngredientsAndPrice } from './ingredients-and-price';
import orderStyles from './style.module.css';

const orderClassname = 'order';

const Order: FC<{
  order: OrderType;
  renderStatus?: boolean;
}> = ({ order, renderStatus }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <li
      className={cs(orderStyles[orderClassname], 'p-6 mr-2')}
      onClick={() => {
        history.push({
          pathname: `/feed/${order._id}`,
          state: {
            backgroundPageLocation: location,
          },
        });
      }}
    >
      <div
        className={orderStyles[`${orderClassname}__number-and-date-wrapper`]}
      >
        <div
          className={cs(
            orderStyles[`${orderClassname}__number`],
            'text text_type_digits-default'
          )}
        >
          #{order.number}
        </div>
        <div
          className={cs(
            orderStyles[`${orderClassname}__date`],
            'text text_color_inactive'
          )}
        >
          {formatOrderDate(order.createdAt)}
        </div>
      </div>
      <div
        className={cs(
          orderStyles[`${orderClassname}__title`],
          'pt-6 text text_type_main-medium'
        )}
      >
        {order.name}
      </div>
      {renderStatus ? (
        <>
          <div className={'pt-2'} />
          <OrderStatus status={order.status} />
        </>
      ) : null}
      <div className={'pt-6'} />
      <IngredientsAndPrice order={order} />
    </li>
  );
};

Order.defaultProps = {
  renderStatus: false,
};

export { Order };
