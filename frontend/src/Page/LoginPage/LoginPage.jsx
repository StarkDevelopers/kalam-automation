import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button, TextField } from '@material-ui/core';

import Logo from '../../_assets/logo/kalam-automation.png';

import { loginUser } from '../../_services';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    marginTop: '5rem',
    padding: '2rem'
  },
  header: {
    paddingBottom: '2rem',
    textAlign: 'center',
  },
  input: {
    margin: '8px 4px',
    width: 'calc(100% - 8px)'
  },
  loginButtonContainer: {
    margin: '24px 4px 4px',
    width: 'calc(100% - 8px)'
  },
  loginButton: {
    width: '100%'
  },
  signUpLink: {
    textAlign: 'center',
    margin: '4px 4px 24px',
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  link: {
    '&:active': {
      color: theme.palette.primary.main
    }
  },
  logo: {
    width: '120px',
    [theme.breakpoints.up('md')]: {
      width: '160px',
    },
  },
}));

function LoginPage(props) {
  const { dispatch } = props;
  const classes = useStyles();
  const [user, setUser] = useState({ number: '', password: ''});

  const onUserPropertyChange = (property, value) => {
    setUser({
      ...user,
      [property]: value
    });
  };

  const login = () => {
    dispatch(loginUser(JSON.stringify(user)));
  };

  const isFormValid = () => {
    return user['number'] && user['password'];
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" className={classes.container}>
        <Grid container spacing={6} className={classes.header}>
          <Grid item xs={12}>
            <img src={Logo} alt="Kalam Automation Logo" className={classes.logo} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              type="number"
              className={classes.input}
              value={user['number'] || ''}
              onChange={e => onUserPropertyChange('number', e.target.value)}
              id="number"
              label="Number*"
              variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              className={classes.input}
              value={user['password'] || ''}
              onChange={e => onUserPropertyChange('password', e.target.value)}
              id="password"
              label="Password*"
              variant="outlined" />
          </Grid>
          <Grid item xs={12} className={classes.loginButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.loginButton}
              disabled={!isFormValid()}
              onClick={login}>
              LOGIN
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, null)(LoginPage);
