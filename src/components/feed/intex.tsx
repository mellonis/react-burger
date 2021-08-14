import cs from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Order } from '../../types';
import { Order as OrderComponent } from './order';
import feedStyles from './style.module.css';

const Feed = ({
  className,
  orders,
}: {
  className?: string;
  orders: Order[];
}) => {
  return (
    <ul className={cs(feedStyles['feed'], 'custom-scroll', className)}>
      {orders.map((order, ix) => (
        <React.Fragment key={order._id}>
          <OrderComponent order={order} />
          {ix + 1 < orders.length ? <div className={'pt-4'} /> : null}
        </React.Fragment>
      ))}
    </ul>
  );
};

Feed.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array,
};

export { Feed };
