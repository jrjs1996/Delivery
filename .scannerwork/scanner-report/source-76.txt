import React from 'react';
import AddOrderForm from './AddOrderForm';
import OrderList from './OrderList';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <AddOrderForm />
      <OrderList />
    </div>
  );
}
