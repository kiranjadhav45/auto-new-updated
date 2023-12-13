
const API_DEV_URL = "https://your-backend-api-url.com/api"; // Replace with your actual API URL

const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

// Helper function to make API calls
async function callApi(
  endpoint,
  method,
  data = null,
  token = null,
  params = {}
) {
  const url = `${API_DEV_URL}/${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    // Add any other headers as needed (e.g., authentication headers)
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(fullUrl, options);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to fetch data");
  }

  return responseData;
}

// CRUD methods
export const apiService = {
  getAll: async (endpoint, token = null, params = {}) =>
    callApi(endpoint, API_METHODS.GET, null, token, params),
  getOne: async (endpoint, id, token = null) =>
    callApi(`${endpoint}/${id}`, API_METHODS.GET, null, token),
  create: async (endpoint, data, token = null) =>
    callApi(endpoint, API_METHODS.POST, data, token),
  update: async (endpoint, id, data, token = null) =>
    callApi(`${endpoint}/${id}`, API_METHODS.PUT, data, token),
  remove: async (endpoint, id, token = null) =>
    callApi(`${endpoint}/${id}`, API_METHODS.DELETE, null, token),
};
