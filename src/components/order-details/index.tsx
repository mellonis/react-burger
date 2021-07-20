import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails_t } from '../../types';
import { lexemes, orderStatusToStatusTitleMap } from '../../consts';

import style from './style.module.css';

const OrderDetails = ({
  className,
  orderDetails: { id, status, message },
}: {
  className?: string;
  orderDetails: OrderDetails_t;
}) => (
  <div className={cs(style['order-details'], className)}>
    <div
      className={cs(style['order-details__id'], 'text text_type_digits-large')}
    >
      {String(id).padStart(6, '0')}
    </div>
    <div className={'pt-8'} />
    <div
      className={cs(
        style['order-details__id-title'],
        'text text_type_main-medium'
      )}
    >
      {lexemes.orderId}
    </div>
    <div className={'pt-15'} />
    <div className={style['order-details__status-icon-wrapper']}>
      <CheckMarkIcon type={'primary'} />
    </div>
    <div className={'pt-15'} />
    <div className={style['order-details__status-title']}>
      {orderStatusToStatusTitleMap[status]}
    </div>
    <div className={'pt-2'} />
    <div className={cs(style['order-details__message'], 'text_color_inactive')}>
      {message}
    </div>
  </div>
);

OrderDetails.propTypes = {
  className: PropTypes.string,
  orderDetails: PropTypes.object.isRequired,
};

export default OrderDetails;
