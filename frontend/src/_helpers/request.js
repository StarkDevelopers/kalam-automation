import { API_URL } from "../_config";

async function handleErrors(response) {
  if (!response.ok) {
    response = await response.json();
    throw new Error(JSON.stringify(response));
  }
  return response;
}

export function request(
  { path, method = "GET", ...args },
  authToken = null,
  noContentType
) {
  const headers = {};

  if (!noContentType) {
    headers["Content-Type"] = "application/json";
  }

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return fetch(`${API_URL}${path}`, {
    method,
    headers,
    ...args,
  })
    .then(handleErrors)
    .then((res) => res.json());
}
