import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrder } from '../../../actions/orderActions';

class CreateOrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: '',
      address: '',
      delivery: true,
      stage: 1,
      message: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange(e) {
    if (e.target.name === 'delivery') {
      const { delivery, stage } = this.state;
      // Can't be out for delivery if order is pickup
      if (delivery === true && stage === 3) {
        this.setState({ delivery: !delivery, stage: 2 });
        return;
      }
      this.setState({ delivery: !delivery });
      return;
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      const { createOrder: action } = this.props;
      await action(this.state);
      this.setState({
        message: 'Order Created!',
        customerName: '',
        address: '',
        delivery: true,
        stage: 1,
      });
    } catch (error) {
      this.setState({ message: 'Error!' });
    }
  }

  render() {
    const {
      customerName,
      address,
      stage,
      delivery,
      message,
    } = this.state;
    return (
      <Paper style={{marginTop: '5%', marginLeft: '20%', marginRight: '20%', paddingLeft: '10%', paddingRight: '10%'}}>
        <form onSubmit={this.onSubmit}>
          <Typography variant="h6" gutterBottom>
            Create Order
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="customerName"
                name="customerName"
                label="Customer Name"
                fullWidth
                autoComplete="fname"
                onChange={this.onChange}
                value={customerName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="billing address-line1"
                onChange={this.onChange}
                value={address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl>
                <Select value={stage} name="stage" onChange={this.onChange}>
                  <MenuItem value={0}>Submitted</MenuItem>
                  <MenuItem value={1}>Preparing</MenuItem>
                  { delivery ? (
                    <MenuItem value={2}>Waiting for delivery</MenuItem>
                  ) : (
                    <MenuItem value={2}>Waiting for pickup</MenuItem>
                  )}
                  { delivery ? <MenuItem value={3}>Out for delivery</MenuItem> : null}
                  <MenuItem value={4}>Completed</MenuItem>
                  <MenuItem value={5}>Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox onChange={(e) => { this.onChange(e); }} checked={delivery} color="secondary" name="delivery" />}
                label="Delivery"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
            <Grid item xs={12}>
              <p>{ message }</p>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

CreateOrderForm.propTypes = {
  createOrder: PropTypes.func.isRequired,
}

export default connect(null, { createOrder })(CreateOrderForm);
