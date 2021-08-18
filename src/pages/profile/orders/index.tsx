import React, { useEffect } from 'react';
import { Feed } from '../../../components/feed/intex';
import {
  subscribeForUserOrders,
  unsubscribeForUserOrders,
} from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';

const Orders = () => {
  const orders = useAppSelector((state) => state.orders.userOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(subscribeForUserOrders());

    return () => {
      dispatch(unsubscribeForUserOrders());
    };
  }, [dispatch]);

  return <Feed orders={orders} renderStatus={true} />;
};

export { Orders };
