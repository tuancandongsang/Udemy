const AMOUNT = [0.1, 0.11, 0.125, 0.14, 0.16, 0.2, 0.25, 0.33, 0.5];

export function ConvertAmountLotRemain(number) {
    if (AMOUNT.includes(Math.abs(number))) {
        const n = Math.abs(number);
        const amount = Math.floor(1/n);
        return `-1/${amount} kit test gộp ${amount}`;
    } else {
        return `${number} kit test`;
    }
}

