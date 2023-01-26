
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const WS_URL = process.env.REACT_APP_WS;

export const ROLE = {
  RECEPTIONIST: { name: 'Lễ Tân', value: "le_tan" },
  DOCTOR: { name: 'Bác Sĩ', value: "bac_si" },
  NURSING: { name: "Điều Dưỡng", value: "dieu_duong" },
  TEST_OPERATOR: { name: 'Xét Nghiệm', value: "ki_thuat" },
  ACCOUNTER: { name: 'Thu Ngân', value: "thu_ngan" },
  PHARMACIST: { name: 'Dược Sĩ', value: "duoc_si" },
  ADMIN: { name: 'Admin', value: "admin" },
  ULTRASOUND: { name: "Siêu Âm", value: "sieu_am" },
  ENT: { name: "Nội Soi", value: "noi_soi" },
  XRAY: { name: "X-Quang", value: "x_quang" },
  INVENTORY: { name: "Kho", value: "kho" },
  MANAGER: { name: "Quản lý", value: "quan_ly" }
};
export const SERVICE_POLICY_TYPE = {
  BHYT: { name: "Bảo hiểm y tế", value: "BHYT" },
  KBHYT: { name: "Không có bảo hiểm y tế", value: "KBHYT" },
  KL3D: { name: "Khám lại trong 3 ngày", value: "KL3D" },
  CBNV: { name: "Cán bộ nhân viên", value: "CBNV" },
  KDV: { name: "Khám dịch vụ", value: "KDV" },
}
export const OTHER_SERVICES = {
  STDAD: 'Soi tươi dịch âm đạo',
  STDND: 'Soi tươi dịch niệu đạo',
  SP: 'Soi Phân',
  MD: 'miễn dịch'
}
export const POLICY_CODE = {
  KL3D: 'KL3D',
  CBNV: 'CBNV',
  KDV: 'KDV',
  BHYT: 'BHYT',
  KBHYT: 'KBHYT'
}
export const OTHER_DATA = {
  'Xét nghiệm nước tiểu tế bào': {
    'Số lượng HC/vi trường(40X)': '',
    'Số lượng BC/vi trường(40X)': '',
    'Trụ HC/vi trường(40X)': '',
    'Trụ BC/vi trường(40X)': '',
    'Trụ hạt/vi trường(40X)': '',
    'Trụ khác/vi trường(40X)': '',
    'Tinh thể/vi trường(40X)': '',
    'Tế bào biểu mô/vi trường(40X)': ''
  },
  'Thời gian máu chảy phương pháp Duke': {
    'Thời gian máu chảy': '',
    'Thời gian máu đông': '',
  },
  'Máu lắng': {
    'Máu lắng 1h': '',
    'Máu lắng 2h': ''
  },
  'Vi nấm soi tươi': {
    'Nấm men': '',
    'Nấm sợi': '',
    'Kí sinh trùng trong da': ''
  },
  'Vi nấm nhuộm soi': {
    'Nấm men': '',
    'Nấm sợi': '',
    'Kí sinh trùng trong da': ''
  },
  'Nhuộm soi dịch họng': {
    'Bạch cầu': '',
    'Cầu khuẩn Gram (+)': '',
    'Trực khuẩn Gram (-)': '',
    'Vi khuẩn khác': '',
  },
  'Trứng giun, sán soi tươi': {
    'Trứng giun': '',
    'Trứng sán': ''
  },
  'LẬU (neisseria gonorrhoeae)': {
    'Cầu khuẩn Gram âm xếp đôi ': '',
  },
  'Soi phân ( Hồng cầu, bạch cầu , đơn bào đường ruột, cặn dư phân)': {
    'Vi khuẩn nhuộm soi': {
      'Cầu khuẩn Gram (+)': '',
      'Trực khuẩn Gram (-)': '',
      'Kết luận': ''
    },
    'Soi tươi': {
      'Hồng cầu': '',
      'Bạch cầu': '',
    },

    'Lỵ Amip': '',
    'Cặn dư trong phân': '',
  },
  'Strongyloides stercoralis(Giun lươn) ấu trùng soi tươi': {
    'Giun lươn': ''
  },
  'Demodex soi tươi': {
    'Demodex soi tươi': ''
  },
  'Demodex nhuộm soi': {
    'Demodex nhuộm soi': ''
  },
  'Hệ RH': {
    'Hệ nhóm RH': ''
  },
  'Hệ nhóm ABO': {
    'Hệ nhóm ABO': ''
  },
  'Soi tươi dịch âm đạo (nấm,bạch cầu, trùng roi)': {
    'Bạch cầu ': '',
    'Vi khuẩn nhuộm soi': {
      'Cầu khuẩn Gram (+)': '',
      'Cầu khuẩn Gram (-)': '',
      'Song cầu Gram': '',
      'Tạp khuẩn': ''
    },
    'Nấm': '',
    'Trichomonasvaginalis': '',
    '.': ''
  },
  'Nhuộm soi dịch âm đạo (vi khuẩn,nấm)': {
    'Bạch cầu ': '',
    'Vi khuẩn nhuộm soi': {
      'Cầu khuẩn Gram dương': '',
      'Trực khuẩn Gram âm': '',
      'Song cầu Gram âm': '',
      'Tạp khuẩn': ''
    },
    'Nấm': '',
    'Trichomonasvaginalis': '',
    '.': ''
  },
  'Nhuộm soi dịch niệu đạo (vi khuẩn,nấm)': {
    'Bạch cầu ': '',
    'Vi khuẩn nhuộm soi': {
      'Cầu khuẩn Gram (+)': '',
      'Trực khuẩn Gram (-)': '',
      'Song cầu Gram': '',
    },
    'Nấm': '',
    '': ''
  },
  'Soi tươi dịch niệu đạo (nấm,bạch cầu, trùng roi)': {
    'Bạch cầu ': '',
    'Vi khuẩn nhuộm soi': {
      'Cầu khuẩn Gram dương': '',
      'Trực khuẩn Gram âm': '',
      'Song cầu Gram âm': '',
    },
    'Nấm': '',
    '': '',
  },
  'Điện giải đồ': {
    'Na+': '',
    'K+': '',
    'Cl-': ''
  },
  'Tìm cặn dư trong phân': {
    'Cặn dư trong phân': ''
  },
  'Phospho': {
    'Phospho': ''
  }, 'Nấm trong phân': {
    'Nấm trong phân': ''
  },
}

export const STATUS = {
  NEW: "new",
  READY: "ready",
  RUNNING: "running",
  CANCEL: "cancel",
  DONE: "done",
  PAID: "paid"
};

export const JOB_STEP_STATUS_VN = {
  [STATUS.READY]: "Chờ lấy mẫu",
  [STATUS.RUNNING]: "Chờ xét nghiệm"
}

export const LOCALSTORAGE = {
  TOKEN: 'token',
  USER: 'user',
  LOCATION: 'location'
}

export const SERVICE_TYPE = {
  EXAM: "exam",
  TEST: "test",
  ULTRASOUND: "ultrasound",
  XRAY: "x-ray",
  ENT: "ent",
  OTHER: "other",
}

export const SERVICE_TYPE_VN = {
  [SERVICE_TYPE.EXAM]: "Khám",
  [SERVICE_TYPE.TEST]: "Xét nghiệm",
  [SERVICE_TYPE.ULTRASOUND]: "Siêu âm",
  [SERVICE_TYPE.XRAY]: "X-Quang",
  [SERVICE_TYPE.ENT]: "Nội soi",
  [SERVICE_TYPE.OTHER]: "Cấp cứu"
}

export const COVID_SERVICE = {
  COV_FAST_1: 'Xét nghiệm kháng nguyên virus SARS-CoV2 (mẫu đơn)',
  COV_FAST_2: 'Xét nghiệm nhanh kháng nguyên virus SARS-CoV2 (mẫu gộp 2)',
  COV_FAST_3: 'Xét nghiệm nhanh kháng nguyên virus SARS-CoV2 (mẫu gộp 3)',
  COV_FAST_4: 'Xét nghiệm nhanh kháng nguyên virus SARS-CoV2 (mẫu gộp 4)',
  COV_NB_FAST_1: 'Xét nghiệm nhanh kháng nguyên virus SARS-CoV2 (mẫu đơn) NB',
  COV_NB_FAST_2: 'Xét nghiệm nhanh kháng nguyên virus SARS-CoV2 (gộp 2) NB',
  COV_NB_FAST_3: 'Xét nghiệm nhanh kháng nguyên virus SARS-CoV2 (gộp 3 ) NB',
  COV_PCR_1: 'Realtime PCR SARS-CoV-2- Mẫu đơn',
  COV_PCR_2: 'Realtime PCR SARS-CoV-2- Gộp 2',
  COV_PCR_3: 'Realtime PCR SARS-CoV-2- Gộp 3',
  COV_PCR_4: 'Realtime PCR SARS-CoV-2- Gộp 4',
  COV_PCR_5: 'Realtime PCR SARS-CoV-2- Gộp 5',
  COV_PCR_10: 'Realtime PCR SARS-CoV-2- Gộp 10',
}

export const STEP_TYPE = {
  EXAM: 'exam',
  TEST: 'test',
  BUY: 'buy',
  CANCEL: 'cancel'
}

export const INTERVAL_REPORT = [
  { value: "month", label: "Tháng" },
  { value: "day", label: "Ngày" },
]

export const ORDER_TYPE = {
  OTC: { code: "otc_drug", label: "Đơn bổ sung" }, // thuốc bổ sung bán tại quầy
  ETC: { code: "etc_drug", label: "Đơn chỉ định" }, // thuốc theo toa
  OTHER: { code: "other", label: "Đơn khác" }
}

export const LOCATION_TYPE = {
  EXAMINATION: "PK",
  EMERGENCY: "CC",
  PHARMACY: "QT",
  XRAY: "XQ",
  TESTING: "XN",
  ULTRASOUND: "SA",
  ENT: "NS",
}

export const REGEX_TEL = "^0\\d{9,11}$";
export const REGEX_DATE = "^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\\d{4}$";

export const ERR_MSG = {
  EMAIL: "Sai định dạng email, vui lòng kiểm tra lại",
  REQUIRED: "*",
  MIN: "Giá trị phải lớn hơn: ",
  MAX: "Giá trị phải nhỏ hơn: ",
  MIN_LENGTH: "Độ dài phải lớn hơn: ",
  MAX_LENGTH: "Độ dài phải nhỏ hơn: ",
  P_TEL: "Vui lòng kiểm tra lại số điện thoại",
  P_DATE: "Sai định dạng thời gian, vui lòng kiểm tra lại",
  CF_PASSWORD: "Mật khẩu không trùng nhau",
};

export function String(number, option) {
  let string = "";
  if (option == "date") {
    string = number < 10 ? `0${number}` : `${number}`;
  }
  if (option == "service") {
    string = number < 10 ? `00${number}` : number < 100 ? `0${number}` : `${number}`;
  }
  return string;
}

export const DATE = (time, string) => {
  let date;
  if (["string", "number"].includes(typeof time)) {
    date = new Date(time);
  }
  if (time == "now") {
    date = new Date();
  }
  const year = date.getFullYear().toString().substr(2, 4);
  const month = String((date.getMonth() + 1), "date");
  const day = String(date.getDate(), "date");
  const hour = String(date.getHours(), "date");
  const min = String(date.getMinutes(), "date");
  const sec = String(date.getSeconds(), "date");
  if (string === "YYMMDDHHMMSS") {
    return year + month + day + hour + min + sec;
  }
  if (string === "DDMMYYYY") {
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return year + month + day + hour + min + sec;
}

export const EQUAL_ARRAY = (a, b) => {
  if (Array.isArray(a) == false || Array.isArray(b) == false) {
    return `${a} or ${b} not array`
  }
  if (a.length !== b.length) {
    return false;
  }
  const result = a.every((elA, index) => elA == b[index]);
  return result;
}

export const splitRegion = (string) => {
  let arrString = [];
  if (string.trim().length !== 0) {
    arrString = string.split(" ");
    if (arrString[0] == "Tỉnh") {
      arrString.splice(0, 1);
      return arrString.join(" ");
    }
    if (arrString[0] == "Thành") {
      arrString.splice(0, 2);
      return "TP. " + arrString.join(" ");
    }
    if (arrString[0] == "Thị") {
      arrString.splice(0, 2);
      return "TT. " + arrString.join(" ");
    }
    if (["Quận", "Huyện", "Phường", "Xã"].includes(arrString[0])) {
      arrString.splice(0, 1);
      return arrString.join(" ");
    }
  }
  return arrString;
}

export const ATTR_UNIT = {
  ML: { code: 'ml', label: 'ml' },
  MG: { code: 'mg', label: 'mg' },
  TABLET: { code: 'tablet', label: 'viên' },
}

export const PRODUCT_UNIT = [
  { code: 'tablet', label: 'viên' },
  { code: 'cans', label: 'lon' },
  { code: 'pack', label: 'gói' },
  { code: 'tube', label: 'ống' },
  { code: 'tup', label: 'tuýp' },
  { code: 'bottle', label: 'lọ' },
  { code: 'box', label: 'hộp' },
  { code: 'piece', label: 'cái' },
]

export const MATERIAL_UNIT = [
  { code: 'cans', label: 'lon' },
  { code: 'pack', label: 'gói' },
  { code: 'tube', label: 'ống' },
  { code: 'tup', label: 'tuýp' },
  { code: 'bottle', label: 'lọ' },
  { code: 'box', label: 'hộp' },
  { code: 'piece', label: 'cái' },
]

export const WAREHOUSE_TYPE = {
  PRODUCT: "product",
  CONSUMABLE: "consumable"
}

export const ROUTE = [
  { value: 'nose ', name: 'Nhỏ mũi' },
  { value: 'buccal', name: 'Ngậm trong má' },
  { value: 'enteral', name: 'Đường ruột' },
  { value: 'inhalable', name: 'Hít' },
  { value: 'infused', name: 'Đường truyền' },
  { value: 'intramuscular', name: 'Tiêm vào cơ' },
  { value: 'intrathecal', name: 'Tiêm vào cột sống' },
  { value: 'intravenous', name: 'Tiêm tĩnh mạch' },
  { value: 'nasal', name: 'Xịt mũi' },
  { value: 'ophthalmic', name: 'Tra mắt' },
  { value: 'oral', name: 'Đường uống' },
  { value: 'otic', name: 'Nhỏ vào tai' },
  { value: 'rectal', name: 'Đặt trực tràng' },
  { value: 'subcutaneous', name: 'Tiêm dưới da' },
  { value: 'sublingual', name: 'Ngậm dưới lưỡi' },
  { value: 'topical', name: 'Tiêm vào cơ' },
  { value: 'buctransdermalcal', name: 'Dán lên da' },
]

export const IOS_DATE = () => {
  let today = new Date().toISOString();
  let date = today.substr(0, 10);
  return date
}

export const NAMEDEVICE = {
  TEST: "Test",
  OTHER: "Other",
  BS200E: "BS-200E",
  UA66: "UA-66",
  BC2800: "BC-2800",
  IMMUNE: 'Immune'
}
export const PAY_METHOD = {
  ATM: { code: 'atm', label: 'chuyển khoản' },
  CASH: { code: 'cash', label: 'tiền mặt' }
}
export const ALL = {
  code: 'all',
  label: 'TẤT CẢ'
}
export const REF_ORDER = {
  RETAIL: 'retail',
  ORDER: 'order',
  LOT: 'lot'
}
export const DEGREE = {
  GIAO_SU: { name: 'Giáo sư - Tiến sĩ', value: "giao_su" },
  PHO_GIAO_SU: { name: 'Phó giáo sư - Tiến sĩ', value: "pho_giao_su" },
  TIEN_SI: { name: 'Tiến sĩ - Bác sĩ', value: "tien_si" },
  THAC_SI: { name: 'Thạc sĩ - Bác sĩ', value: "thac_si" },
}
export const NAME_DOCTOR = {
  DoThienHai: { name: " Đỗ Thiên Hải", value: "dothienhai", hospital: "Bệnh Viện nhi TW", degree: "Tiến sĩ - Bác sĩ" },
  TrinhTienLuc: { name: "Trịnh Tiến Lực", value: "trinhtienluc", hospital: "Bệnh Viện Bạch Mai", degree: "Tiến sĩ - Bác sĩ" },
  NguyenHongSon: { name: "Nguyễn Hồng Sơn", value: "nguyenhongson", hospital: "Bệnh Viện nhi TW", degree: "Thạc sĩ - Bác sĩ" },
  TranMinhVuong: { name: "Trần Minh Vương", value: "tranminhvuong", hospital: "Bệnh Viện nhi TW", degree: "Thạc sĩ - Bác sĩ" },
}
export const MODE_EXPORT = {
  MANAGE_DOCS: 'manage-docs',
  STAFF_DOCS: 'staff-docs',
  MANAGE_EXCEL: 'manage-excel',
  STAFF_EXCEL: 'staff-excel',
  DIFFERENCE_DOCS: 'difference-docs',
  DIFFERENCE_EXCEL: 'difference-excel'
}

export function addressConvert(address) {
  let result = "";
  let street = address?.street ? `${address.street}` : "";
  let ward = address?.ward ? ` - ${address.ward}` : "";
  let district = address?.district ? ` - ${address.district}` : "";
  let provice = address?.province ? `- ${address.province}` : "";
  result = street + ward + district + provice;
  return result
}

export const ONE_HOUR = 3600e3;

export const ONE_DAY = 24 * ONE_HOUR;

export const HOUR24 = [...Array(25)].map((_, index) => +index);

export const GetFiveDays = [...Array(5)].map((_, index) => new Date(Date.now() - index * ONE_DAY).toLocaleDateString("en-gb"));

export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

export const CheckEmptyChar = (string) => {
  if (typeof string === "string") {
    return string.trim().length === 0 ? true : false
  }
  return true;
}

export const convertDate=(string,option)=>{
  let arr=string.split("-").map(el=>+el)
  return new Date(arr[0],arr[1]-1,arr[2]).toLocaleDateString(option)
}
