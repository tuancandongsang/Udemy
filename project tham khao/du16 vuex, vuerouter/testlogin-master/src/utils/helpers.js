// Short duration JWT token (5-10 min)
export function setJwtToken(token) {
  sessionStorage.setItem('jwt', token);
}
export function getJwtToken() {
  return sessionStorage.getItem('jwt');
}
export function removetJwtToken() {
  return sessionStorage.removeItem('jwt');
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken');
}
export function setRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token);
}
export function removeRefreshToken() {
  sessionStorage.removeItem('refreshToken');
}

// url when 403
export function geturl() {
  return sessionStorage.getItem('url');
}
export function seturl(token) {
  sessionStorage.setItem('url', token);
}
export function removeUrl() {
  return sessionStorage.removeItem('url');
}

// check rotate
export function setRotate(token) {
  sessionStorage.setItem('rotate', token);
}
export function getRotate() {
  return sessionStorage.getItem('rotate');
}
export function removeRotate() {
  return sessionStorage.removeItem('rotate');
}
