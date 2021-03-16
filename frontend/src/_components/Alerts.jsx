import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { alertActions } from '../_actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Alerts(props) {
  const { type, message, dispatch } = props;
  
  const handleClose = () => {
    dispatch(alertActions.clear());
  };

  if (!type || !message) {
    return <React.Fragment />
  }

  return <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
      onClose={handleClose}>
    <Alert onClose={handleClose} severity={type}>
      {message}
    </Alert>
  </Snackbar>;
}

function mapStateToProps(state) {
  return {
    type: state.alert.type,
    message: state.alert.message,
  };
}

export default connect(mapStateToProps, null)(Alerts);
