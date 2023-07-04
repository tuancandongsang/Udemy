export const listpageSize = (arr, pageNumber, pageSize) => {
    let arrPushNew = [];
    const lastNumber = pageNumber - 1;
    if (pageNumber * pageSize > arr.length) {
        for (let i = lastNumber * pageSize; i < arr.length; i++) {
            arrPushNew.push(arr[i]);
        }
        return arrPushNew;
    } else {
        for (let i = lastNumber * pageSize; i < pageNumber * pageSize; i++) {
            arrPushNew.push(arr[i]);
        }
        return arrPushNew;
    }
}
export const filterpagesize = (arr, pageSize) => {
    let arrPushNew = [];
    if (pageSize < 20) {
        for (let i = 0; i < pageSize; i++) {
            if (arr[i] == null) {
                return arr;
            }
            arrPushNew.push(arr[i]);
        }
        return arrPushNew;
    }
    return arr;
}