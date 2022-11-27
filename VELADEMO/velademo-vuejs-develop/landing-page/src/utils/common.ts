// dịch chuyển phần tử có thay đổi tới vị trí mong muốn
// arraymove(arr, index, 0) dịch chuyển tới vị trí inddex tới vị trí đầu tiên
export const arraymove = (arr, fromIndex, toIndex) => {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
};

// validateEmail
export const validateEmail = (email) => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return true;
  } else {
    return false;
  }
};


// hàm reduce tính tổng arr trong mảng
export const reduceArr = (arr) => {
  return arr
    .reduce((total, currentValue) => {
      return total + currentValue;
    }, 0)
    .toFixed(2); // lấy 2 giá trị sau dấu phẩy
};

// filter ra mảng tìm kiếm có chưa từ cần tìm là text
export const filterArr = (arr, text) => {
  return arr.filter(item => item.includes(text))
}

//formatNumber theo dang 100.000,03
// type co the la USD, VND... { dang string}
export const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: `USD`,
  }).format(number)
}

// date từ dạng cơ bản xang dạng 03/01/1993 date: String
export const reverseDate = (date) => {
  return date.split("-").reverse().join("/")
}

// random số bất kỳ từ 0 tới number
export const randomNumber = (number) => {
      return Math.floor(Math.random()*number)
}
// reload wep 1 lan
export const reloadWindowOne = () => {
  if (!window.location.hash) {
    window.location.reload();
  }
}