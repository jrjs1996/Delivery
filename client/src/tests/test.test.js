import React from 'react';
import { create } from 'react-test-renderer';

import { Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import { Order } from '../components/Admin/Home/Order';


describe('Testing /Admin/Home/Order', () => {
  it('Shows order details', () => {
    const component = create(
      <Order
        address="test address"
        customerName="test customer"
        delivery
        stage={3}
        id="test id"
        orderCreated="test date"
        updateOrder={() => {}}
      />,
    );
    const { root } = component;
    const labels = root.findAllByType(Typography);

    expect(labels[0].props.children).toBe('test customer');
    expect(labels[1].props.children).toBe('test address');
    expect(labels[2].props.children).toBe('test date');

    const stepper = root.findByType(Stepper);
    expect(stepper.props.activeStep).toBe(3);
  });
});
