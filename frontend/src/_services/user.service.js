import { loaderActions, userActions, alertActions } from "../_actions";
import { logout, getAuthToken, setAuthToken, request } from "../_helpers";

export function createUser(body) {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request({ path: "/api/user", method: "POST", body }, authToken)
      .then((response) => {
        dispatch(loaderActions.loading(false));
        dispatch(alertActions.success("Created user successfully"));
      })
      .catch((error) => {
        dispatch(loaderActions.loading(false));
        dispatch(alertActions.error("Failed to create user"));
      });
  };
}

export function loginUser(body) {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));

    return request({ path: "/api/user/admin-login", method: "POST", body })
      .then((response) => {
        setAuthToken(response.token);
        dispatch(userActions.setUser(response.data));
        dispatch(loaderActions.loading(false));
        dispatch(alertActions.success("Logged in successfully"));
      })
      .catch((error) => {
        dispatch(alertActions.error("Failed to login"));
        dispatch(loaderActions.loading(false));
      });
  };
}

export function getUser() {
  return (dispatch) => {
    dispatch(userActions.loadingProfile(true));
    const authToken = getAuthToken();

    return request({ path: "/api/user" }, authToken)
      .then((response) => {
        dispatch(userActions.setUser(response));
        dispatch(loaderActions.loading(false));
      })
      .catch((error) => {
        logout();
        dispatch(userActions.loadingProfile(false));
        dispatch(loaderActions.loading(false));
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    logout();
    dispatch(userActions.setUser(null));
  };
}

export function listUsers() {
  return (dispatch) => {
    dispatch(loaderActions.loading(true));
    const authToken = getAuthToken();

    return request({ path: "/api/user/list" }, authToken)
      .then((response) => {
        dispatch(userActions.setListUser(response.data));
        dispatch(loaderActions.loading(false));
      })
      .catch((error) => {
        console.log(error.toString());
        dispatch(alertActions.error("Failed to fetch user list"));
        dispatch(userActions.setListUser(null));
        dispatch(loaderActions.loading(false));
      });
  };
}
