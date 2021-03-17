import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import * as Validator from 'validatorjs';
import { Delete, Create } from '@material-ui/icons';

import { UsersModal } from './UserModal';
import { listUsers, createUser, editUser, deleteUser } from '../../_services';

const rules = {
  name: 'required|string',
  number: ['required', 'regex:/^[\\d]{10}$/'],
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
  },
  buttons: {
    cursor: 'pointer',
    marginLeft: '0.25rem',
  },
  deleteButton: {
    backgroundColor: theme.palette.error.dark
  },
  dialogActions: {
    padding: '0 1.5rem 1.5rem'
  },
}));

function UsersPage(props) {
  const { users, dispatch } = props;
  const classes = useStyles();
  const [modal, showModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
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
    dispatch(createUser(JSON.stringify(user))).then(response => {
      if (response) {
        showModal(false);
        dispatch(listUsers());
      }
    });
  };

  const edit = () => {
    dispatch(editUser(JSON.stringify(user))).then(response => {
      if (response) {
        showModal(false);
        dispatch(listUsers());
      }
    });
  };

  const _deleteUser = () => {
    dispatch(deleteUser(user._id)).then(response => {
      if (response) {
        showDeleteModal(false);
        dispatch(listUsers());
      }
    });
  };
  
  const openModal = (open, id = null, isDelete = false) => {
    const editingUser = users.find(user => user._id === id);
    if (editingUser) {
      changeUser({
        _id: editingUser._id,
        name: editingUser.name,
        number: editingUser.number,
        password: editingUser.password,
        isAdmin: editingUser.isAdmin,
      });
    } else {
      changeUser({
        name: '',
        number: '',
        password: '',
        isAdmin: false,
      });
    }
    isDelete ? showDeleteModal(open) : showModal(open);
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
              <TableCell size="small">Actions</TableCell>
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
                  <TableCell>
                    <Create className={classes.buttons} onClick={() => openModal(true, user._id)} />
                    <Delete className={classes.buttons} onClick={() => openModal(true, user._id, true)} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={modal} onClose={() => showModal(false)} aria-labelledby="form-dialog-title">
        <UsersModal showModal={showModal} user={user} onChangeUser={onChangeUser} validateForm={validateForm} create={create} edit={edit} />
      </Dialog>
      <Dialog open={deleteModal} onClose={() => showDeleteModal(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete user permanently. Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={() => showDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={_deleteUser} variant="contained" color="primary" className={classes.deleteButton}>
            Delete
          </Button>
        </DialogActions>
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
