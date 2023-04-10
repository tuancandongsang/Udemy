if ("Worker" in window) {

  // time cdn
  const worker = new Worker("worker.js");
  worker.onmessage = function (event) {
    const message = event.data;
    switch (message.type) {
      case "UPDATE_TIME": {
        const timeDOM = document.getElementById("time");
        timeDOM.innerHTML = message.payload;
      }
      case "TUANCAN": {
        const timeDOM = document.getElementById("tuancan");
        timeDOM.innerHTML = message.payload;
      }
    }
  };
  setInterval(() => {
    worker.postMessage({
      type: "GET_NOW",
    });
  }, 1000);

  // ajax call api
  const json = new Worker("workerApi.js")
  json.onmessage = function (event) {
    const message = event.data;
    const callApi = document.getElementById("json");
    callApi.innerText = JSON.parse(message).name;
  };

  // text
  const name = new Worker("workerName.js")
  name.onmessage = function (event) {
    const message = event.data;
    const name = document.getElementById("name");
    name.innerText = message;
  };

  // call api img

  const img = new Worker("workerImg.js")
  img.onmessage = function (event) {
    const message = event.data;
    var image = document.createElement("IMG");
    image.setAttribute("src", JSON.parse(message).url);
    image.setAttribute("width", "304");
    image.setAttribute("height", "228");
    image.setAttribute("alt", "The Pulpit Rock");
    document.body.appendChild(image);
    console.log("message", image);
  };

} else {
  console.log("not Support Worker");
}
