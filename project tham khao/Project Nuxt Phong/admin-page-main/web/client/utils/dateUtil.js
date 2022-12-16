import moment from "moment";
export default class DateUtils {
  static format(strDate, format) {
    var parseDate = moment(strDate).format(format);
    return parseDate;
  }
}
