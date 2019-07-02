import React, { Component, useState, useEffect } from 'react';
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
import shortid from 'shortid';
import { createOrder } from '../../../actions/orderActions';
import MenuItemList from '../Menu/MenuItemList/MenuItemList';
import { fetchMenu } from '../../../actions/menuActions';
import OrderItem from './OrderItem';
import SettingPage from '../Settings/SettingPage/SettingPage';
import SettingPageInput from '../Settings/SettingPage/SettingPageInput/SettingPageInput';
import SettingPageCheckBox from '../Settings/SettingPage/SettingPageCheckBox/SettingPageCheckBox';

const onDeliveryChange = (delivery, setDelivery, stage, setStage) => {
  if (delivery === true && stage === 3) {
    setStage(2);
  }
  setDelivery(!delivery);
};

const onSubmit = (customerName,
  address,
  delivery,
  stage,
  items,
  total,
  createOrder) => {
  const orderItems = items.map(i => i._id);
  createOrder({ customerName, address, delivery, stage, items: orderItems, total });
  this.setState({
    message: 'Order Created!',
    customerName: '',
    address: '',
    delivery: true,
    stage: 1,
  });
};

const addItem = (item, menu, items, setItems, total, setTotal) => {
  item = menu[item]
  const newItems = items.slice();
  newItems.push(item);
  const newTotal = total + item.price;
  setItems(newItems);
  setTotal(newTotal);
};

const removeItem = (index, items, setItems, total, setTotal) => {
  const newItems = items.slice();
  const newTotal = total - items[index].price;
  newItems.splice(index, 1);
  setItems(newItems);
  setTotal(newTotal);
};

function CreateOrderForm({
  fetchMenu,
}) {
  const [delivery, setDelivery] = useState(true);
  const [message, setMessage] = useState('');
  const [stage, setStage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(fetchMenu, [fetchMenu])

  return (
    <div>
      <SettingPage
        title="Create Order"
        onSubmit={console.log}
      >
        <SettingPageInput required fullWidth name="customerName" label="Customer Name" />
        <SettingPageInput required fullWidth name="address" label="Address" />
        <Select value={1} name="stage">
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
        <SettingPageCheckBox label="Delivery" name="delivery" value />
      </SettingPage>
    </div>
  );
}


//class CreateOrderForm extends Component {
//  render() {
//    const {
//      customerName,
//      address,
//      stage,
//      delivery,
//      message,
//      items,
//      total,
//    } = this.state;
//    const { menu } = this.props;
//    return (
//      <div>
//        <Paper style={{marginTop: '5%', marginLeft: '20%', marginRight: '20%', paddingLeft: '10%', paddingRight: '10%'}}>
//          <form onSubmit={this.onSubmit}>
//              <Grid item xs={12} md={6}>
//                
//              </Grid>
//              <Grid item xs={12}>
//                <Button variant="contained" color="primary" type="submit">Submit</Button>
//              </Grid>
//              <Grid item xs={12}>
//                <p>{ message }</p>
//              </Grid>
//              {items.map((i, index) => (
//                <Grid item xs={12} key={shortid.generate()}>
//                  <OrderItem item={i} index={index} onClick={this.removeItem} />
//                </Grid>
//              ))}
//              <Typography variant="h3">
//                $
//                {total}
//              </Typography>
//            </Grid>
//          </form>
//        </Paper>
//        <MenuItemList menu={menu} onSelect={i => this.addItem(i, menu)} />
//      </div>
//    );
//  }
//}

CreateOrderForm.propTypes = {
  createOrder: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, { createOrder, fetchMenu })(CreateOrderForm);
