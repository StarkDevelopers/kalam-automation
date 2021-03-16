import { loaderConstants } from "../_constants";

export const loaderActions = {
  loading,
};

function loading(isLoading) {
  return { type: loaderConstants.LOADING, isLoading };
}
