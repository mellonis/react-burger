import cs from 'classnames';
import React from 'react';
import { orderStatusToStatusTitleMap } from '../../consts';
import { OrderStatus_t } from '../../types';
import orderStyles from './style.module.css';

const orderStatusClassname = 'order-status';

const OrderStatus = ({ status }: { status: OrderStatus_t }) => (
  <div
    className={cs(orderStyles[orderStatusClassname], {
      [orderStyles[`${orderStatusClassname}_${OrderStatus_t.done}`]]:
        status === OrderStatus_t.done,
    })}
  >
    {orderStatusToStatusTitleMap[status]}
  </div>
);

export { OrderStatus };
