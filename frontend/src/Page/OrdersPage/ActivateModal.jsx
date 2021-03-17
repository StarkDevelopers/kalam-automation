import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
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
  },
  container: {
    width: '376px',
  },
  value: {
    fontSize: '1rem',
    marginBottom: '0.5rem'
  },
  divider: {
    marginBottom: '0.5rem'
  },
}));

export function ActivateModal(props) {
  const { closeActivateModal, getOrder, activate } = props;
  const classes = useStyles();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder().then(response => {
      if (response) {
        setOrder(response);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title" className={classes.title}>Activate Product</DialogTitle>
      <DialogContent className={classes.content}>
        {
          order &&
          <div className={classes.container}>
            <Typography variant="subtitle2">IMEI Number</Typography>
            <Typography className={classes.value}>{order.imeiNumber}</Typography>
            <Typography variant="subtitle2">Sim Card Number</Typography>
            <Typography className={classes.value}>{order.simCardNumber}</Typography>
            <Typography variant="subtitle2">Mobile Number</Typography>
            <Typography className={classes.value}>{order.mobileNumber}</Typography>
            <Typography variant="subtitle2">Installer Name</Typography>
            <Typography className={classes.value}>{order.installerName}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Customer Name</Typography>
            <Typography className={classes.value}>{order.customerName}</Typography>
            <Typography variant="subtitle2">Company Name</Typography>
            <Typography className={classes.value}>{order.companyName}</Typography>
            <Typography variant="subtitle2">Address</Typography>
            <Typography className={classes.value}>{order.address}</Typography>
            <Typography variant="subtitle2">GST Number</Typography>
            <Typography className={classes.value}>{order.gstNumber}</Typography>
            <Typography variant="subtitle2">Customer Mobile Number 1</Typography>
            <Typography className={classes.value}>{order.customerMobileNumber1}</Typography>
            <Typography variant="subtitle2">Customer Mobile Number 2</Typography>
            <Typography className={classes.value}>{order.customerMobileNumber2}</Typography>
            <Typography variant="subtitle2">Email ID</Typography>
            <Typography className={classes.value}>{order.emailId}</Typography>
            <Typography variant="subtitle2">Vehicle Number</Typography>
            <Typography className={classes.value}>{order.vehicleNumber}</Typography>
            <Typography variant="subtitle2">Vehicle Company</Typography>
            <Typography className={classes.value}>{order.vehicleCompany}</Typography>
            <Typography variant="subtitle2">GPS User Name</Typography>
            <Typography className={classes.value}>{order.gpsUserName}</Typography>
            <Typography variant="subtitle2">GPS Password</Typography>
            <Typography className={classes.value}>{order.gpsPassword}</Typography>
          </div>
        }
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button color="primary" onClick={() => closeActivateModal()}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={activate}>
          Activate
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
