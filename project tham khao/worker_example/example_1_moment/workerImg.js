
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/photos/1", true);
  xhr.onload = function () {
    // Nếu nội dung được tải về thành công, trả lại nội dung cho trang web
    if (xhr.status === 200) {
      postMessage(xhr.responseText);
    }
  };
  xhr.send();