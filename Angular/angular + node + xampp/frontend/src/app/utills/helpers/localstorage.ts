// Short duration userID (5-10 min)
export function setUserID(userid: string) {
  localStorage.setItem("userid", userid);
}
export function getUserID() {
  return localStorage.getItem("userid");
}
export function removeUserID() {
  localStorage.removeItem("userid");
}

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
export function setRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token);
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}

// url when 403
export function geturl() {
  return localStorage.getItem("url");
}
export function seturl(token: string) {
  localStorage.setItem("url", token);
}
export function removeUrl() {
  return localStorage.removeItem("url");
}