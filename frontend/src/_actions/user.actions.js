import { userConstants } from "../_constants";

export const userActions = {
  setUser,
  loadingProfile,
  changeVisibility,
  setListUser,
};

function setUser(user) {
  return { type: userConstants.SET_USER, user };
}

function loadingProfile(isLoading) {
  return { type: userConstants.LOADING_PROFILE, isLoading };
}

function changeVisibility(visibility) {
  return { type: userConstants.CHANGE_VISIBILITY, visibility };
}

function setListUser(users) {
  return { type: userConstants.SET_LIST_USERS, users };
}
