import {
  Select, MenuItem, Input, Button, InputLabel, FormControl,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { CustomerPropType } from '../../../../propTypes';

export default function AddressInput({ address, currentCustomer, setAddress }) {
  const [dropDown, setDropDown] = useState(true);

  if (currentCustomer._id && dropDown) {
    return (
      <FormControl style={{ width: '100%' }}>
        <InputLabel htmlFor="address-input">Address</InputLabel>
        <Select
          name="Address"
          placeholder="Address"
          value={address}
          id="Address"
          inputProps={{
            name: 'address-input',
            id: 'address-input',
          }}
          onChange={(e) => {
            const { value } = e.target;
            if (value === -1) {
              setDropDown(false);
              setAddress('');
              return;
            }
            setAddress(e.target.value);
          }}
        >
          {currentCustomer.addresses.map(a => (
            <MenuItem value={a}>{a}</MenuItem>
          ))}
          <MenuItem value={-1}>Enter Address</MenuItem>
        </Select>
      </FormControl>
    );
  }
  return (
    <div>
      <Input
        name="Address"
        value={address}
        placeholder="Address"
        style={{ width: '100%' }}
        onChange={e => setAddress(e.target.value)}
      />
      <Button onClick={() => setDropDown(true)}>Select Address</Button>
    </div>
  );
}

AddressInput.propTypes = {
  /** Value of address */
  address: PropTypes.string.isRequired,
  /** The currenlty logged in customer */
  currentCustomer: CustomerPropType.isRequired,
  /** Function to set address */
  setAddress: PropTypes.func.isRequired,
};
