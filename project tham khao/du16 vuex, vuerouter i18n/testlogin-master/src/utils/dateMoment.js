import moment from 'moment';

export const timeChangeString = moment().format().slice(0, 10);
export const typeDate = 'YYYY-MM-DD';
export const dateFormat = moment(timeChangeString, typeDate)