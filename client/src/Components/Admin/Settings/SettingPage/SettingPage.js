import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import shortid from 'shortid';
import { ChildrenPropType } from '../../../../propTypes';


const onChange = (e, submitData, setSubmitData, onValueChange) => {
  let newSubmitData = Object.assign({}, submitData);
  newSubmitData[e.target.name] = e.target.value;
  if (onValueChange) {
    newSubmitData = onValueChange(newSubmitData);
  }
  setSubmitData(newSubmitData);
};

const initializeSubmitData = (children) => {
  const submitData = {};
  React.Children.forEach(children, (child) => {
    switch (child.type.name) {
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
  onValueChange,
  onSubmit,
  submitText,
  title,
  ...props
}) {
  const [submitData, setSubmitData] = useState(() => initializeSubmitData(children));
  const [message, setMessage] = useState('');

  return (
    <Paper {...props}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom id="pageTitle">
            {title}
          </Typography>
          {React.Children.map(children, child => React.cloneElement(child,
            {
              onChange: e => onChange(e, submitData, setSubmitData, onValueChange),
              value: submitData[child.props.name],
              state: submitData,
            }))}
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 8 }}>
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
  /** An optional function that will be called with the new state
   * of the setting page. The function should return the new state.
   */
  onValueChange: PropTypes.func,
  /**
   * The text that will appear on the submit button.
   */
  submitText: PropTypes.string,
  /** Title that will appear on top of page. */
  title: PropTypes.string,
};

SettingPage.defaultProps = {
  onValueChange: null,
  submitText: 'Submit',
  title: '',
};
