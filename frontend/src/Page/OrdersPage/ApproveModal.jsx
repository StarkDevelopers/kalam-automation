import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: 0
  },
  password: {
    marginTop: '0.5rem'
  },
  dialogActions: {
    padding: '1.5rem'
  }
}));

export function ApproveModal(props) {
  const { showApproveModal, approveFields, onChange, validateForm, approve } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title" className={classes.title}>Approve Product</DialogTitle>
      <DialogContent className={classes.content}>
        <TextField
          autoFocus
          margin="dense"
          id="imei-number"
          label="IMEI Number"
          fullWidth
          value={approveFields.imeiNumber}
          onChange={e => onChange('imeiNumber', e.target.value)}
        />
        <TextField
          margin="dense"
          id="sim-number"
          label="Sim Number"
          fullWidth
          value={approveFields.simCardNumber}
          onChange={e => onChange('simCardNumber', e.target.value)}
        />
        <TextField
          margin="dense"
          id="mobile-number"
          label="Mobile Number"
          fullWidth
          value={approveFields.mobileNumber}
          onChange={e => onChange('mobileNumber', e.target.value)}
        />
        <TextField
          margin="dense"
          id="installer-name"
          label="Installer Name"
          fullWidth
          value={approveFields.installerName}
          onChange={e => onChange('installerName', e.target.value)}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button color="primary" onClick={() => showApproveModal(false)}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" disabled={!validateForm()} onClick={approve}>
          Approve
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
