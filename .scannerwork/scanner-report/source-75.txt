import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/adminActions';

class LogoutButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { history, logout: action } = this.props;
    action();
    history.push('/');
  }

  render() {
    return (
      <div>
        <Button onClick={this.onClick} {...this.props}>Logout</Button>
      </div>
    );
  }
}

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { logout })(LogoutButton));
