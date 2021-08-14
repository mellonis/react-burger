import cs from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { orderStatusToStatusTitleMap } from '../../../consts';
import { Order as OrderType, OrderStatus } from '../../../types';
import { IngredientsAndPrice } from './ingredients-and-price';
import orderStyles from './style.module.css';

const orderClassname = 'order';

const Order = ({
  order,
  renderStatus,
}: {
  order: OrderType;
  renderStatus?: boolean;
}) => (
  <li className={cs(orderStyles[orderClassname], 'p-6 mr-2')}>
    <div className={orderStyles[`${orderClassname}__number-and-date-wrapper`]}>
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
        {order.createdAt}
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
        <div
          className={cs(orderStyles[`${orderClassname}__status`], {
            [orderStyles[`${orderClassname}__status_done`]]:
              order.status === OrderStatus.done,
          })}
        >
          {orderStatusToStatusTitleMap[order.status]}
        </div>
      </>
    ) : null}
    <div className={'pt-6'} />
    <IngredientsAndPrice order={order} />
  </li>
);

Order.propTypes = {
  order: PropTypes.object.isRequired,
  renderStatus: PropTypes.bool,
};

Order.defaultProps = {
  renderStatus: false,
};

export { Order };
