import { ApolloError } from '@apollo/client';
import React, { ReactElement } from 'react';

import Loader from '../../lib/Loading';
import { Order } from '../../lib/types';
import OrderItem, { OrderListHeader } from '../orderItem/OrderItem';

type OrderListProps = {
  error?: ApolloError;
  list: Order[];
  loading: boolean;
};

const OrderList = ({
  list = [],
  loading,
  error,
}: OrderListProps): ReactElement => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <OrderListHeader />
      {list.map((order) => (
        <OrderItem key={order.reference} order={order} />
      ))}
    </>
  );
};

export default OrderList;
