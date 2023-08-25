// setChatrooms
export function setroomchat(roomchat : object) {
  const chatroomString = JSON.stringify(roomchat);
  localStorage.setItem("roomchat", chatroomString);
}
export function getroomchat() {
  return localStorage.getItem("roomchat");
}
export function removeroomchat() {
  localStorage.removeItem("roomchat");
}
