importScripts('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js')
self.onmessage = function (event) {
    const message = event.data;
    switch (message.type) {
        case 'GET_NOW': {
            sendMessage({
                type: 'UPDATE_TIME',
                payload: moment().format('DD/MM/YYYY hh:mm:ss')

            })
        }
    }
    sendMessage({
        payload: "tuancandongsang"
    })
}
function sendMessage(message) {
    return self.postMessage(message)
}