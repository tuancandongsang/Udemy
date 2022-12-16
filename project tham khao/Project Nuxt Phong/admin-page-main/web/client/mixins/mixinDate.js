import DateUtils from "../utils/dateUtil";
export default {
  methods: {
    formatDate(strDate, format = 'DD-MM-YYYY') {
      return DateUtils.format(strDate, format);
    },
  },
};
