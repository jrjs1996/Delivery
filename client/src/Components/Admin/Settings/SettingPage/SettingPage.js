import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const onChange = (e, submitData, setSubmitData) => {
  const newSubmitData = Object.assign({}, submitData);
  newSubmitData[e.target.name] = e.target.value;
  setSubmitData(newSubmitData);
};

export default function SettingPage({
  children,
  onSubmit,
  submitText,
  title,
}) {
  const [submitData, setSubmitData] = useState({});
  const [message, setMessage] = useState('');

  return (
    <Paper style={{
      marginTop: '5%',
      marginLeft: '30%',
      marginRight: '30%',
      paddingLeft: '2%',
      paddingRight: '2%',
    }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          {React.Children.map(children, child => React.cloneElement(child,
            {
              onChange: e => onChange(e, submitData, setSubmitData),
              value: submitData[child.props.name],
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
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

SettingPage.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  title: PropTypes.string,
};

SettingPage.defaultProps = {
  submitText: 'Submit',
  title: '',
};
