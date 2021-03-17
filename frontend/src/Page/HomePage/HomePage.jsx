import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { UsersPage, OrdersPage } from "../index";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#FFFFFF',
    fontSize: '1rem',
    textDecoration: 'none',
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  },
  activeLink: {
    backgroundColor: theme.palette.grey[800]
  },
}));

export function HomePage(props) {
  const classes = useStyles();
  console.log('Home Page...');

  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h6" className={classes.title}>
              KALAM AUTOMATION
            </Typography>
            <NavLink to="/users" className={classes.link} activeClassName={classes.activeLink}>Users</NavLink>
            <NavLink to="/orders" className={classes.link} activeClassName={classes.activeLink}>Orders</NavLink>
            <Button color="inherit">Logout</Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/orders" component={OrdersPage} />
        <Redirect to ="/users" />
      </Switch>
    </Router>
  );
}
