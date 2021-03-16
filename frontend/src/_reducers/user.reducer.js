import { userConstants } from "../_constants";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.SET_USER:
      return {
        ...state,
        loadingProfile: false,
        user: { ...action.user },
      };
    case userConstants.LOADING_PROFILE:
      return {
        ...state,
        loadingProfile: action.isLoading,
      };
    case userConstants.CHANGE_VISIBILITY:
      const user = JSON.parse(JSON.stringify(state.user));
      return {
        ...state,
        user: {
          ...user,
          visibility: action.visibility,
        },
      };
    case userConstants.SET_LIST_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
}
