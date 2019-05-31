import React, { Component } from 'react';
import axios from 'axios';

export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: '' };
  }

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers() {
    axios.get('http://localhost:9000/testAPI')
      .then((res) => {
        console.log(res)
        this.setState({ customers: res.data.firstName });
      });
  }

  render() {
    const { customers } = this.state;
    return (
      <div>
        <p>{ customers }</p>
      </div>
    );
  }
}
