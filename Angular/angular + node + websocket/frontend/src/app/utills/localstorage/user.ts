
// Short duration user (5-10 min)
export function setUser(user : object) {
  const userString = JSON.stringify(user);
  localStorage.setItem("user", userString);
}
export function getUser() {
  return localStorage.getItem("user");
}
export function removeUser() {
  localStorage.removeItem("user");
}

// Short duration JWT token (5-10 min)
export function setToken(token : string) {
  localStorage.setItem("token", token);
}
export function getToken() {
  return localStorage.getItem("token");
}
export function removeToken() {
  localStorage.removeItem("token");
}

// Longer duration refresh token (30-60 min)
export function setRefreshToken(token : string) {
  localStorage.setItem("refreshToken", token);
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}

