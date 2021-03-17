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
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import moment from 'moment';
import * as Validator from 'validatorjs';

import { listOrders, approveOrder, activateOrder, getOrderDetails, deleteOrder } from '../../_services';
import { ProductStatus } from '../../_enums';
import { ApproveModal } from './ApproveModal';
import { ActivateModal } from './ActivateModal';

const approveFieldRules = {
  _id: 'required|string',
  imeiNumber: 'required|string',
  simCardNumber: 'required|string',
  mobileNumber: 'required|string',
  installerName: 'required|string',
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
    marginRight: '0.5rem',
  },
  deleteButton: {
    backgroundColor: theme.palette.error.dark
  },
  dialogActions: {
    padding: '0 1.5rem 1.5rem'
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  pending: {
    backgroundColor: theme.palette.warning.dark,
    fontWeight: 'bold',
    color: 'white'
  },
  approved: {
    backgroundColor: theme.palette.info.dark,
    fontWeight: 'bold',
    color: 'white'
  },
  inactive: {
    backgroundColor: theme.palette.grey[600],
    fontWeight: 'bold',
    color: 'white'
  },
  active: {
    backgroundColor: theme.palette.success.dark,
    fontWeight: 'bold',
    color: 'white'
  },
}));

function OrdersPage(props) {
  const { dispatch } = props;
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [approveModal, showApproveModal] = useState(false);
  const [approveFields, changeApproveFields] = useState({});
  const [activateId, setActivateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const onChangeApproveFields = (field, value) => {
    changeApproveFields({
      ...approveFields,
      [field]: value,
    })
  };

  const openApproveModal = (id) => {
    changeApproveFields({
      _id: id,
      imeiNumber: '',
      simCardNumber: '',
      mobileNumber: '',
      installerName: '',
    });
    showApproveModal(true);
  };

  const openActivateModal = (id) => {
    setActivateId(id);
  };

  const closeActivateModal = () => {
    setActivateId(null);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
  };

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    dispatch(listOrders()).then(orders => {
      if (orders) {
        setOrders(orders);
      }
    });
  };

  const classStatus = status => {
    switch (status) {
      case ProductStatus.PENDING:
        return classes.pending;
      case ProductStatus.APPROVED:
        return classes.approved;
      case ProductStatus.INACTIVE:
        return classes.inactive;
      case ProductStatus.ACTIVE:
        return classes.active;
    }
  };

  const validateForm = () => {
    const rules = { ...approveFieldRules };
    const userValidation = new Validator(approveFields, rules);

    if (userValidation.fails()) {
      return false;
    }
    return true;
  };

  const getOrder = () => {
    return dispatch(getOrderDetails(activateId));
  };

  const approve = () => {
    dispatch(approveOrder(JSON.stringify(approveFields), approveFields._id))
      .then(response => {
        if (response) {
          init();
          showApproveModal(false);
        }
      });
  };

  const activate = () => {
    dispatch(activateOrder(activateId))
      .then(response => {
        if (response) {
          init();
          closeActivateModal();
        }
      });
  };

  const _deleteOrder = () => {
    dispatch(deleteOrder(deleteId)).then(response => {
      if (response) {
        init();
        closeDeleteModal();
      }
    });
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell size="small">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              orders && orders.map(order => (
                <TableRow key={order._id}>
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell>{order.productId.name}</TableCell>
                  <TableCell>{moment(order.orderId.date).format('Do MMM yyyy')}</TableCell>
                  <TableCell><Chip label={order.status} className={classStatus(order.status)} /></TableCell>
                  <TableCell>
                    <div className={classes.actions}>
                      <Delete className={classes.buttons} onClick={() => setDeleteId(order._id)} />
                      {
                        order.status === ProductStatus.PENDING &&
                        <Button onClick={() => openApproveModal(order._id)} variant="contained" color="primary" size="small" className={classes.approved}>
                          Approve
                        </Button>
                      }
                      {
                        order.status === ProductStatus.INACTIVE &&
                        <Button onClick={() => openActivateModal(order._id)} variant="contained" color="primary" size="small" className={classes.active}>
                          Activate
                        </Button>
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={approveModal} onClose={() => showApproveModal(false)}>
        <ApproveModal showApproveModal={showApproveModal} approveFields={approveFields} onChange={onChangeApproveFields} validateForm={validateForm} approve={approve} />
      </Dialog>
      <Dialog open={activateId !== null} onClose={() => closeActivateModal(false)} maxWidth="sm">
        <ActivateModal closeActivateModal={closeActivateModal} activate={activate} getOrder={getOrder} />
      </Dialog>
      <Dialog open={deleteId !== null} onClose={() => closeDeleteModal(false)}>
        <DialogTitle id="form-dialog-title">Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete order data permanently. Are you sure you want to delete this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={() => closeDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={_deleteOrder} variant="contained" color="primary" className={classes.deleteButton}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default connect(null, null)(OrdersPage);
