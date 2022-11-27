// Short duration JWT token (5-10 min)
export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token);
}
export function getJwtToken() {
  return sessionStorage.getItem("jwt");
}
export function removetJwtToken() {
  return sessionStorage.removeItem("jwt");
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken");
}
export function setRefreshToken(token: string) {
  sessionStorage.setItem("refreshToken", token);
}
export function removeRefreshToken() {
  sessionStorage.removeItem("refreshToken");
}


// url when 403
export function geturl() {
  return sessionStorage.getItem("url");
}
export function seturl(token: string) {
  sessionStorage.setItem("url", token);
}
export function removeUrl() {
  return sessionStorage.removeItem("url");
}

// theme dark light
export function setTheme(token: string) {
  sessionStorage.setItem("theme", token);
}
export function getThem() {
  return sessionStorage.getItem("theme");
}
export function removeThem() {
  return sessionStorage.removeItem("them");
}
