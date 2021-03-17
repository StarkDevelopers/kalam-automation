import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  },
  password: {
    marginTop: '0.5rem'
  },
  dialogActions: {
    padding: '0 1.5rem 1.5rem'
  }
}));

export function UsersModal(props) {
  const { showModal, user, onChangeUser, validateForm, create, edit } = props;
  const classes = useStyles();
  const [showPassword, togglePassword] = useState(false);

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title" className={classes.title}>{user._id ? 'Edit' : 'Create'} User</DialogTitle>
      <DialogContent className={classes.content}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={user.name}
          onChange={e => onChangeUser('name', e.target.value)}
        />
        <TextField
          margin="dense"
          id="number"
          label="Number"
          type="number"
          fullWidth
          value={user.number}
          onChange={e => onChangeUser('number', e.target.value)}
        />
        <FormControl className={classes.password}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={user.password}
            onChange={e => onChangeUser('password', e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePassword(!showPassword)}
                  onMouseDown={event => event.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="password-helper-text">Password must be strong: Atleast 8 characters long having
            atleast 1 Uppercase letter, 1 Lowercase letter, 1 Special Character and 1 Number</FormHelperText>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={user.isAdmin}
              onChange={e => onChangeUser('isAdmin', e.target.checked)}
              name="isAdmin"
              color="primary"
            />
          }
          label="Is Admin?"
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button color="primary" onClick={() => showModal(false)}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" disabled={!validateForm()} onClick={user._id ? edit : create}>
          {user._id ? 'Edit' : 'Create'}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
