import { loaderConstants } from '../_constants';

export function loader(state = {}, action) {
  switch (action.type) {
    case loaderConstants.LOADING:
      return {
        isLoading: action.isLoading
      };
    default:
      return state
  }
}