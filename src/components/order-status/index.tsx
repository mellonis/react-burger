import cs from 'classnames';
import React from 'react';
import { orderStatusToStatusTitleMap } from '../../consts';
import { OrderStatus as OrderStatusType } from '../../types';
import orderStyles from './style.module.css';

const orderStatusClassname = 'order-status';

const OrderStatus = ({ status }: { status: OrderStatusType }) => (
  <div
    className={cs(orderStyles[orderStatusClassname], {
      [orderStyles[`${orderStatusClassname}_done`]]:
        status === OrderStatusType.done,
    })}
  >
    {orderStatusToStatusTitleMap[status]}
  </div>
);

export { OrderStatus };
