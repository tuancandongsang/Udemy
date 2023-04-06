importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"
);
var xhr = new XMLHttpRequest();
xhr.onload = function () {
  // Nếu nội dung được tải về thành công, trả lại nội dung cho trang web
  if (xhr.status === 200) {
    postMessage(xhr.responseText);
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhr.send();

self.onmessage = function (event) {
  const message = event.data;
  switch (message.type) {
    case "GET_NOW": {
      sendMessage({
        type: "UPDATE_TIME",
        payload: moment().format("DD/MM/YYYY hh:mm:ss"),
      });
    }
  }
  sendMessage({
    payload: "tuancandongsang",
  });
};
function sendMessage(message) {
  return self.postMessage(message);
}
