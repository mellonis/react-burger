import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import React from 'react';
import { lexemes, orderStatusToStatusTitleMap } from '../../consts';
import { OrderDetails_t } from '../../types';
import placedOrderDetailsStyles from './style.module.css';

const placedOrderDetails = 'placed-order-details';

const PlacedOrderDetails = ({
  className,
  orderDetails: { id, status, message },
}: {
  className?: string;
  orderDetails: OrderDetails_t;
}) => (
  <div className={cs(placedOrderDetailsStyles[placedOrderDetails], className)}>
    <div
      className={cs(
        placedOrderDetailsStyles[`${placedOrderDetails}__id`],
        'text text_type_digits-large'
      )}
    >
      {String(id).padStart(6, '0')}
    </div>
    <div className={'pt-8'} />
    <div
      className={cs(
        placedOrderDetailsStyles[`${placedOrderDetails}__id-title`],
        'text text_type_main-medium'
      )}
    >
      {lexemes.orderId}
    </div>
    <div className={'pt-15'} />
    <div
      className={
        placedOrderDetailsStyles[`${placedOrderDetails}__status-icon-wrapper`]
      }
    >
      <CheckMarkIcon type={'primary'} />
    </div>
    <div className={'pt-15'} />
    <div
      className={
        placedOrderDetailsStyles[`${placedOrderDetails}__status-title`]
      }
    >
      {orderStatusToStatusTitleMap[status]}
    </div>
    <div className={'pt-2'} />
    <div
      className={cs(
        placedOrderDetailsStyles[`${placedOrderDetails}__message`],
        'text_color_inactive'
      )}
    >
      {message}
    </div>
  </div>
);

export { PlacedOrderDetails };
