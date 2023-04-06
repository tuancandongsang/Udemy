if ("Worker" in window) {
  const worker = new Worker("worker.js");
  worker.onmessage = function (event) {
    const message = event.data;
    switch (message.type) {
      case "UPDATE_TIME": {
        const timeDOM = document.getElementById("time");
        timeDOM.innerHTML = message.payload;
      }
    }

    const nameDOM = document.getElementById("name");
    nameDOM.innerHTML = message.payload;

    const callApi = document.getElementById("json");
    callApi.innerText = event.data;
    // console.log(event.data);
  };
  setInterval(() => {
    worker.postMessage({
      type: "GET_NOW",
    });
  }, 1000);
} else {
  console.log("not Support Worker");
}
