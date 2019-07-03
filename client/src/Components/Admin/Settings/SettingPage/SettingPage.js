import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import shortid from 'shortid';
import { ChildrenPropType } from '../../../../propTypes';


const onChange = (e, submitData, setSubmitData) => {
  const newSubmitData = Object.assign({}, submitData);
  newSubmitData[e.target.name] = e.target.value;
  setSubmitData(newSubmitData);
};

const initializeSubmitData = (children) => {
  const submitData = {};
  React.Children.forEach(children, (child) => {
    switch (child.type.name) {
      case 'InputList':
        if (child.props.value) {
          submitData[child.props.name] = child.props.value.map(v => (
            { value: v, key: shortid.generate() }));
          return;
        }
        submitData[child.props.name] = [];
        break;
      default:
        if (child.props.value) {
          submitData[child.props.name] = child.props.value;
          return;
        }
        submitData[child.props.name] = '';
        break;
    }
  });
  return submitData;
};

export default function SettingPage({
  children,
  onSubmit,
  submitText,
  title,
  style,
}) {
  const [submitData, setSubmitData] = useState(() => initializeSubmitData(children));
  const [message, setMessage] = useState('');

  return (
    <Paper style={style}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom id="pageTitle">
            {title}
          </Typography>
          {React.Children.map(children, child => React.cloneElement(child,
            {
              onChange: e => onChange(e, submitData, setSubmitData),
              value: submitData[child.props.name],
              state: submitData,
            }))}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setMessage(onSubmit(submitData))}
          >
            {submitText}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" id="message" gutterBottom>
            {message}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

SettingPage.propTypes = {
  /** SettingPageInputs for this setting page. */
  children: ChildrenPropType.isRequired,
  /** Function to be called when the submit button is pressed.
   * This function will be given an object containing a property
   * and value for each input in children.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * The text that will appear on the submit button.
   */
  submitText: PropTypes.string,
  /** Title that will appear on top of page. */
  title: PropTypes.string,
};

SettingPage.defaultProps = {
  submitText: 'Submit',
  title: '',
};
