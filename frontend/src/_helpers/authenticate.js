export function authenticated() {
  const authToken = getAuthToken();
  if (authToken) {
    return true;
  }
  return false;
}

export function setAuthToken(authToken) {
  return localStorage.setItem('auth_token', authToken);
}

export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function logout() {
  return localStorage.removeItem('auth_token');
}
