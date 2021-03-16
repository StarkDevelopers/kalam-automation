import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Dialog } from '@material-ui/core';
import * as Validator from 'validatorjs';

import { UsersModal } from './UserModal';
import { listUsers, createUser } from '../../_services';

const rules = {
  name: 'required|string',
  number: 'required|integer|digits:10',
  password: ['required', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/'],
  isAdmin: 'required|boolean'
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem'
  },
  createUserButton: {
    float: 'right',
    marginBottom: '1rem',
  }
}));

function UsersPage(props) {
  const { users, dispatch } = props;
  const classes = useStyles();
  const [modal, showModal] = useState(false);
  const [user, changeUser] = useState({});

  const onChangeUser = (field, value) => {
    changeUser({
      ...user,
      [field]: value,
    })
  };

  useEffect(() => {
    if (!users) {
      dispatch(listUsers());
    }
  }, [users, dispatch]);

  const create = () => {
    dispatch(createUser(JSON.stringify(user))).then(() => {
      showModal(false);
      dispatch(listUsers());
    });
  };
  
  const openModal = (open) => {
    changeUser({
      name: '',
      number: '',
      password: '',
      isAdmin: false,
    });
    showModal(open);
  };
  
  const validateForm = () => {
    const userRules = { ...rules };
    const userValidation = new Validator(user, userRules);

    if (userValidation.fails()) {
      return false;
    }
    return true;
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Button variant="contained" color="primary" className={classes.createUserButton} onClick={() => openModal(true)}>
        CREATE USER
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users && users.map(user => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>{'Actions'}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={modal} onClose={() => showModal(false)} aria-labelledby="form-dialog-title">
        <UsersModal showModal={showModal} user={user} onChangeUser={onChangeUser} validateForm={validateForm} create={create} />
      </Dialog>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
  };
}

export default connect(mapStateToProps, null)(UsersPage);
