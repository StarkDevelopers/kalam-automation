import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { user } from "./user.reducer";
import { loader } from "./loader.reducer";

const rootReducer = combineReducers({
  alert,
  user,
  loader,
});

export default rootReducer;
