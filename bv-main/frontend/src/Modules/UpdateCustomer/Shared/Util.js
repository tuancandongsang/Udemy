const readThreeDigits = (number) => {
  const digitText = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  let word = "";
  let numberDigits = Array.from(number.toString()).map(Number).reverse();

  if (numberDigits[2]) {
    word += digitText[numberDigits[2]] + " trăm";
  }
  if (numberDigits[1]) {
    if (numberDigits[1] === 1) {
      word += " mười";
    } else {
      word += " " + digitText[numberDigits[1]] + " mươi";
    }
  } else if (numberDigits[2] && numberDigits[0]) {
    word += " linh";
  }
  if (numberDigits[0]) {
    if (numberDigits[0] === 5 && numberDigits[1]) {
      word += " lăm";
    } else if (
      numberDigits[0] === 1 &&
      numberDigits[1] &&
      numberDigits[1] !== 1
    ) {
      word += " mốt";
    } else {
      word += " " + digitText[numberDigits[0]];
    }
  }
  return word;
};

export const moneyToWord = (money) => {
  if (!money) return 'Không đồng'
  let word = "";
  const unit = ["nghìn", "triệu", "tỷ"];
  let moneyTemp = money;

  let i = 0;
  let threeDigitsNumberArr = [];
  while (moneyTemp > 0) {
    threeDigitsNumberArr.push(moneyTemp % 1000);
    moneyTemp = Math.floor(moneyTemp / 1000);
  }
  if (threeDigitsNumberArr[0]) {
    word += readThreeDigits(threeDigitsNumberArr[0]) + " ";
  }
  if (threeDigitsNumberArr[1]) {
    word = readThreeDigits(threeDigitsNumberArr[1]) + " nghìn " + word;
  }
  if (threeDigitsNumberArr[2]) {
    word = readThreeDigits(threeDigitsNumberArr[2]) + " triệu " + word;
  }
  if (threeDigitsNumberArr[3]) {
    word = readThreeDigits(threeDigitsNumberArr[3]) + " tỷ " + word;
  }
  if (threeDigitsNumberArr[4]) {
    word = readThreeDigits(threeDigitsNumberArr[4]) + " nghìn " + word;
  }
  if (threeDigitsNumberArr[5]) {
    word = readThreeDigits(threeDigitsNumberArr[5]) + " triệu " + word;
  }

  if (!(money % 1000000000000)) {
    word += "tỷ ";
  }
  if (threeDigitsNumberArr[6] !== undefined) {
    return "Money too much";
  }

  return word + "đồng";
};
export function numberWithCommas(x) {
  if(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  else
    return 0;
    
}
function toDate(dateStr) {
  const array = dateStr.split("/");
  const time_format = array[0].length > 2 ? array : array.reverse();
  return new Date(time_format[0], time_format[1] - 1, time_format[2]);
}

export function convertToNormDate(dateStr) {
  let dateArr = dateStr.split("/").reverse();
  let day = dateArr[0];
  let month = dateArr[1];
  if (day.length === 1) dateArr[0] = "0" + day;
  if (month.length === 1) dateArr[1] = "0" + month;
  return dateArr.join("-");
}

export function convertToStrDate(normDate) {
  if (!normDate) {
    return "";
  }
  let strDate = normDate.split("-").reverse().join("/");
  return strDate;
}

export function getAge(dateString) {
  const today = new Date();
  const birthDate = toDate(dateString);
  const m = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  if (age < 1) {
    return diff_weeks(today, birthDate) + " tuần";
  } else if( age < 4  ){
    return diff_months(today, birthDate) + " tháng";
  } else {
    return age + " tuổi";
  }
}

// eg 12031999 -> 12/03/1999
export function autoAddSlashDate(rawDate) {
  let result = rawDate
  if (result[2] && result[2] !== '/') {
    result = result.slice(0, 2) + "/" + result.slice(2);
  }
  if (result[5] && result[5] !== '/') {
    result = result.slice(0, 5) + "/" + result.slice(5);
  }
  return result
}

export function daysBetween(StartDate, EndDate) {
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
  const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}

export function stringToSlug(str) {
  // remove accents
  let from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
      to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (let i=0, l=from.length ; i < l ; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

  return str;
}

function diff_weeks(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
}
function diff_months(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 30;
  return Math.abs(Math.round(diff));
}