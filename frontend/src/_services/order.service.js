import { loaderActions, userActions, alertActions } from "../_actions";
import { getAuthToken, request } from "../_helpers";

export function listOrders() {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request({ path: "/api/orderItems/listAll" }, authToken)
      .then((response) => {
        dispatch(loaderActions.loading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(alertActions.error("Failed to fetch orders"));
        dispatch(loaderActions.loading(false));
      });
  };
}

export function approveOrder(body, id) {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request(
      { path: `/api/orderItems/approve/${id}`, method: "POST", body },
      authToken
    )
      .then((response) => {
        dispatch(loaderActions.loading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(alertActions.error("Failed to Approve Order"));
        dispatch(loaderActions.loading(false));
      });
  };
}

export function activateOrder(id) {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request(
      { path: `/api/orderItems/activate/${id}`, method: "POST" },
      authToken
    )
      .then((response) => {
        dispatch(loaderActions.loading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(alertActions.error("Failed to Activate Order"));
        dispatch(loaderActions.loading(false));
      });
  };
}

export function getOrderDetails(id) {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request({ path: `/api/orderItems/${id}` }, authToken)
      .then((response) => {
        dispatch(loaderActions.loading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(alertActions.error("Failed to fetch order details"));
        dispatch(loaderActions.loading(false));
      });
  };
}

export function deleteOrder(id) {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request(
      { path: `/api/orderItems/${id}`, method: "DELETE" },
      authToken
    )
      .then((response) => {
        dispatch(loaderActions.loading(false));
        return response.data;
      })
      .catch((error) => {
        dispatch(alertActions.error("Failed to delete order"));
        dispatch(loaderActions.loading(false));
      });
  };
}
