import cs from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { lexemes, orderStatusToStatusTitleMap } from '../../consts';
import { Order, OrderStatus_t } from '../../types';
import feedActivityStyles from './style.module.css';

const feedActivityClassname = 'feed-activity';

const FeedActivity = ({
  className,
  orders,
  total,
  totalToday,
}: {
  className?: string;
  orders: Order[];
  total?: number;
  totalToday?: number;
}) => {
  const statusToOrdersMap = useMemo(() => {
    return orders.reduce(
      (result, order) => {
        const { status } = order;

        if (!result.hasOwnProperty(status)) {
          result[status] = [];
        }

        result[status].push(order);

        return result;
      },
      {} as {
        [key in OrderStatus_t]: Order[];
      }
    );
  }, [orders]);
  const statusToStatusUlsMap = [
    OrderStatus_t.created,
    OrderStatus_t.pending,
    OrderStatus_t.done,
  ].reduce((result, status) => {
    const orders = statusToOrdersMap[status];

    // INFO: (mellonis) I am completely sure that the useMemo hook will be called the required number of times,
    //       so I added the eslint disable command
    // eslint-disable-next-line react-hooks/rules-of-hooks
    result[status] = useMemo(() => {
      return orders
        ? [orders.slice(0, 5), orders.slice(5, 10)].map((orderList, ix) =>
            orderList.length > 0 ? (
              <React.Fragment key={ix}>
                <ul
                  key={ix}
                  className={cs(
                    feedActivityStyles[`${feedActivityClassname}__orders`],
                    'text text_type_digits-default'
                  )}
                >
                  {orderList.map(({ _id: id, number }, ix) => (
                    <React.Fragment key={id}>
                      {ix > 0 ? <div className={'pt-2'} /> : null}
                      <li
                        className={cs(
                          feedActivityStyles[`${feedActivityClassname}__order`]
                        )}
                      >
                        {number}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </React.Fragment>
            ) : null
          )
        : null;
    }, [orders]);

    return result;
  }, {} as { [key in OrderStatus_t]: ReactNode });

  return (
    <div
      className={cs(
        feedActivityStyles[feedActivityClassname],
        'custom-scroll',
        className
      )}
    >
      <div
        className={
          feedActivityStyles[`${feedActivityClassname}__orders-by-status`]
        }
      >
        {[OrderStatus_t.done, OrderStatus_t.pending].map((status, ix) => (
          <React.Fragment key={status}>
            {ix > 0 ? <div className={'pb-6'} /> : null}
            <div
              className={cs(
                feedActivityStyles[`${feedActivityClassname}__orders-list`],
                feedActivityStyles[
                  `${feedActivityClassname}__orders-list_${status}`
                ]
              )}
            >
              <div className={'pb-6'}>
                {orderStatusToStatusTitleMap[status]}:
              </div>
              <div
                className={
                  feedActivityStyles[`${feedActivityClassname}__orders-wrapper`]
                }
              >
                {statusToStatusUlsMap[status]}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {total ? (
        <>
          <div className={'pt-15'} />
          <div className={'text text_type_main-medium'}>
            {lexemes.ordersTotalCount}:
          </div>
          <div
            className={cs(
              feedActivityStyles[
                `${feedActivityClassname}__orders-total-count`
              ],
              'text text_type_digits-large'
            )}
          >
            {total}
          </div>
        </>
      ) : null}
      {totalToday ? (
        <>
          <div className={'pt-15'} />
          <div className={'text text_type_main-medium'}>
            {lexemes.ordersTodayTotalCount}:
          </div>
          <div
            className={cs(
              feedActivityStyles[
                `${feedActivityClassname}__orders-total-count`
              ],
              'text text_type_digits-large'
            )}
          >
            {totalToday}
          </div>
        </>
      ) : null}
    </div>
  );
};

export { FeedActivity };
