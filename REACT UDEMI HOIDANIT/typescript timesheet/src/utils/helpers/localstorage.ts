// Short duration JWT token (5-10 min)
export function setToken(token: string) {
  localStorage.setItem("token", token);
}
export function getToken() {
  return localStorage.getItem("token");
}
export function removeToken() {
  localStorage.removeItem("token");
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token);
}
export function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}
