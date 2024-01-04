const bearerToken = localStorage.getItem('token');

if (!bearerToken) {
    throw new Error("Bearer token not found in localStorage");
}
const decoded = jwtDecode(bearerToken);

const user_id = decoded.user_id;
const headers = {
    'Content-Type': 'application/json',
};
if (!decoded || !decoded.user_id) {
    throw new Error("Invalid or missing user_id in decoded token");
}
// Include the Authorization header if a bearer token is available
if (decoded && decoded.user_id) {
    headers['user_id'] = `${user_id}`;
    headers['id'] = `${user_id}`;
}