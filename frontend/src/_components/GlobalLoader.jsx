import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Loader from './Loader';

const useStyles = makeStyles(() => ({
  loaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#999999',
    opacity: 0.7
  },
}));

function GlobalLoader(props) {
  const { isLoading } = props;
  const classes = useStyles();

  if (!isLoading) {
    return <React.Fragment />
  }
  return <div className={classes.loaderContainer}>
    <Loader />
  </div>;
}

function mapStateToProps(state) {
  return {
    isLoading: state.loader.isLoading
  };
}

export default connect(mapStateToProps, null)(GlobalLoader);
