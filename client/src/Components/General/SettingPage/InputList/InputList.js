import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Button, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingPageInput from '../SettingPageInput/SettingPageInput';

export default function InputList({
  onChange, name, value, title,
}) {
  const [keys, setKeys] = useState(value.map(() => shortid.generate()));
  return (
    <div name={name} style={{ marginTop: 10, marginBottom: 10 }}>
      <Typography align="left">{title}</Typography>
      {value.map((v, i) => (
        <div key={keys[i]}>
          <Grid container>
            <Grid item xs={9} s={11}>
              <SettingPageInput
                required
                fullWidth
                label={`${name} ${i}`}
                name={`${name}${i}`}
                value={v}
                onChange={(e) => {
                  const newValues = value.slice();
                  newValues[i] = e.target.value;
                  onChange({ target: { name, value: newValues } });
                }}
              />
            </Grid>
            <Grid item xs={3} s={1}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                style={{ marginTop: 6 }}
                onClick={() => {
                  const newValues = value.slice();
                  newValues.splice(i, 1);
                  const newKeys = keys.slice();
                  newKeys.splice(i, 1);
                  setKeys(newKeys);
                  onChange({ target: { name, value: newValues } });
                }}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      ))}
      <Button
        type="button"
        variant="contained"
        style={{ backgroundColor: '#39d43d', color: 'white', marginTop: 10 }}
        onClick={() => {
          const newValues = value.slice();
          newValues.push('');
          const newKeys = keys.slice();
          newKeys.push(shortid.generate());
          setKeys(newKeys);
          onChange({ target: { name, value: newValues } });
        }}
      >
        +
      </Button>
      <hr />
    </div>
  );
}

InputList.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

InputList.defaultProps = {
  onChange: () => {},
  title: null,
  value: [],
};
