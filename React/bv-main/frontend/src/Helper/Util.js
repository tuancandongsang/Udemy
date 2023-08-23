
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export class Util {

    constructor() { }

    static typeName = (typeCode) => {
        try {
            typeCode = Number.parseInt(typeCode);
            switch (typeCode) {
                case 1:
                    return 'Create';
                case 2:
                    return 'Update';
                case 3:
                    return 'Remove';
                default:
                    return 'Unknown';
            }
        }
        catch {
            return 'Unknown';
        }
    }

    static statusName = (statusCode) => {
        try {
            statusCode = Number.parseInt(statusCode);
            switch (statusCode) {
                case 1:
                    return 'Pendding';
                case 2:
                    return 'Approved';
                case 3:
                    return 'Rejected';
                default:
                    return 'Unknown';
            }
        } catch {
            return 'Unknown';
        }
    }

    static dateString = (date) => {
        let _date = new Date(date);
        return `${monthName[_date.getMonth()]} ${_date.getDate()}, ${_date.getFullYear()}`;
    }

    static timeString = (date) => {
        return
    }

    static getModelName = (model) => {
        model = model || '';
        return model.split(/(?=[A-Z])/).join(' ');
    }

    static onKeyDown = (event) => {
        if (event.keyCode === 13) {
            // event.preventDefault();
            let index = parseInt(event.target.dataset.index);
            if (document.querySelector('[data-index="' + (index + 1) + '"]') == null) {
                
                return
            } else {
                document.querySelector('[data-index="' + (index + 1) + '"]').focus();
            }
        }
    }

    static formatPrice = (num) => {
        return new Intl.NumberFormat('de-DE').format(num)
    }
}
