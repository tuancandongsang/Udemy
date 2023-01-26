import { InventoryNS } from "./inventory";

const REF_ORDER = {
    RETAIL: "retail",
    ORDER: "order",
    LOT: "lot"
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

export const STAFF_FORM = {
    index: "STT",
    name: "Tên thuốc",
    unit: "Đơn vị",
    price: "Giá",
    order: "Xuất đơn",
    orderAmount: "Đơn VNĐ",
    retail: "Xuất lẻ",
    retailAmount: "Lẻ VNĐ",
    total: "Tổng",
    totalAmount: "VNĐ",
    import: "Nhập",
    export: "Xuất"
}

export const MANAGE_FORM = {
    index: "STT",
    name: "Tên thuốc",
    unit: "Đơn vị",
    price: "Giá",
    initial: "Tồn đầu",
    initialAmount: "TĐ VNĐ",
    export: "Xuất",
    exportAmount: "X VNĐ",
    import: "Nhập",
    importAmount: "N VNĐ",
    final: "Tồn cuối",
    finalAmount: "TC VNĐ"
}

export const DIFFERENCE_FORM = {
    index: "STT",
    name: "Tên thuốc",
    unit: "Đơn vị",
    priceDifference: "Giá chênh lệch",
    order: "Xuất Đơn",
    retail: "Xuất Lẻ",
    export: "Tổng xuất",
    total: "Thành tiền"
}

export async function DifferenceRevuene(transInventory: Array<InventoryNS.ViewTransaction>) {
    let data = [];
    transInventory = transInventory.sort((a, b) => a.product.name.localeCompare(b.product.name));
    const productIds = new Set(transInventory.map(el => {
        if(el.ref !== REF_ORDER.LOT) return el.product_id;
    }));
    [...productIds].filter(p => p).forEach((pID, index) => {
        let obj = {
            [DIFFERENCE_FORM.index]: index + 1,
            [DIFFERENCE_FORM.name]: '',
            [DIFFERENCE_FORM.unit]: '',
            [DIFFERENCE_FORM.priceDifference]: 0,
            [DIFFERENCE_FORM.order]: 0,
            [DIFFERENCE_FORM.retail]: 0,
            [DIFFERENCE_FORM.export]: 0,
            [DIFFERENCE_FORM.total]: 0
        }

        transInventory.forEach(t => {
            if (pID === t.product_id) {
                obj[DIFFERENCE_FORM.name] = t.product?.name;
                obj[DIFFERENCE_FORM.unit] = t.product.unit ? t.product.unit : " ";
                obj[DIFFERENCE_FORM.priceDifference] = +t.product.price - +t.product.origin_price;
                let currentDifferencePrice = t.item ? +t.item.price - +t.product.origin_price : +t.product.price - +t.product.origin_price;
                switch (t.ref) {
                    case REF_ORDER.RETAIL:
                        obj[DIFFERENCE_FORM.retail] = +obj[DIFFERENCE_FORM.retail] - +t.amount;
                        break;
                    case REF_ORDER.ORDER:
                        obj[DIFFERENCE_FORM.order] = +obj[DIFFERENCE_FORM.order] - +t.amount;
                        break;
                }
                obj[DIFFERENCE_FORM.export] = +obj[DIFFERENCE_FORM.retail] + +obj[DIFFERENCE_FORM.order];
                obj[DIFFERENCE_FORM.total] = +obj[DIFFERENCE_FORM.export] * +currentDifferencePrice;
            }
        })
        data.push(obj);
    });

    let obj = {
        [DIFFERENCE_FORM.index]: '',
        [DIFFERENCE_FORM.name]: '',
        [DIFFERENCE_FORM.unit]: '',
        [DIFFERENCE_FORM.priceDifference]: '',
        [DIFFERENCE_FORM.order]: '',
        [DIFFERENCE_FORM.retail]: '',
        [DIFFERENCE_FORM.export]: 'Tổng: ',
        [DIFFERENCE_FORM.total]: 0,
    }

    data.map(d => {
        obj[DIFFERENCE_FORM.total] = +obj[DIFFERENCE_FORM.total] + +d[DIFFERENCE_FORM.total];
        PRODUCT_UNIT.forEach(p => {
            if (d[DIFFERENCE_FORM.unit] === p.code) d[DIFFERENCE_FORM.unit] = p.label;
        });
        return d;
    });
    data.push(obj);
    return { data };
}

export async function StaffRevuene(transInventory: Array<InventoryNS.ViewTransaction>, user_id: string) {
    let data = [];
    transInventory = transInventory.filter(t => t.created_by === user_id).sort((a, b) => a.product.name.localeCompare(b.product.name));
    const productIds = new Set(transInventory.map(el => {
        if (el.created_by === user_id) {
            return el.product_id;
        }
    }));

    [...productIds].filter(p => p).forEach((pID, index) => {
        let obj = {
            [STAFF_FORM.index]: index + 1,
            [STAFF_FORM.name]: '',
            [STAFF_FORM.unit]: '',
            [STAFF_FORM.price]: 0,
            [STAFF_FORM.order]: 0,
            [STAFF_FORM.orderAmount]: 0,
            [STAFF_FORM.retail]: 0,
            [STAFF_FORM.retailAmount]: 0,
            [STAFF_FORM.total]: 0,
            [STAFF_FORM.totalAmount]: 0,
            [STAFF_FORM.import]: 0,
            [STAFF_FORM.export]: 0
        }

        transInventory.forEach(t => {      
            if (pID === t.product_id) {
                obj[STAFF_FORM.name] = t.product?.name;
                obj[STAFF_FORM.unit] = t.product?.unit ? t.product.unit : " ";
                obj[STAFF_FORM.price] = t.product?.price;

                switch (t.ref) {
                    case REF_ORDER.RETAIL:
                        obj[STAFF_FORM.retail] = +obj[STAFF_FORM.retail] - +t.amount;
                        obj[STAFF_FORM.retailAmount] = +obj[STAFF_FORM.retailAmount] + +t.item?.price * +-t.amount;
                        break;
                    case REF_ORDER.ORDER:
                        obj[STAFF_FORM.order] = +obj[STAFF_FORM.order] - +t.amount;
                        obj[STAFF_FORM.orderAmount] = +obj[STAFF_FORM.orderAmount] + +t.item?.price * +-t.amount;
                        break;
                    case REF_ORDER.LOT:
                        if (t.amount > 0) {
                            obj[STAFF_FORM.import] = +obj[STAFF_FORM.import] + +t.amount;
                        }
                        if (t.amount < 0) {
                            obj[STAFF_FORM.export] = +obj[STAFF_FORM.export] - +t.amount;
                        }
                }
                obj[STAFF_FORM.total] = +obj[STAFF_FORM.order] + +obj[STAFF_FORM.retail];
                obj[STAFF_FORM.totalAmount] = +obj[STAFF_FORM.orderAmount] + +obj[STAFF_FORM.retailAmount];
            }
        })
        data.push(obj);
    });

    let obj = {
        [STAFF_FORM.index]: '',
        [STAFF_FORM.name]: '',
        [STAFF_FORM.unit]: '',
        [STAFF_FORM.price]: '',
        [STAFF_FORM.order]: 'Tổng:',
        [STAFF_FORM.orderAmount]: 0,
        [STAFF_FORM.retail]: 'Tổng',
        [STAFF_FORM.retailAmount]: 0,
        [STAFF_FORM.total]: 'Tổng',
        [STAFF_FORM.totalAmount]: 0,
        [STAFF_FORM.import]: '',
        [STAFF_FORM.export]: ''
    }
    data.map(d => {
        obj[STAFF_FORM.orderAmount] = +obj[STAFF_FORM.orderAmount] + +d[STAFF_FORM.orderAmount];
        obj[STAFF_FORM.retailAmount] = +obj[STAFF_FORM.retailAmount] + +d[STAFF_FORM.retailAmount];
        obj[STAFF_FORM.totalAmount] = +obj[STAFF_FORM.totalAmount] + +d[STAFF_FORM.totalAmount];
        PRODUCT_UNIT.forEach(p => {
            if (d[MANAGE_FORM.unit] === p.code) d[MANAGE_FORM.unit] = p.label;
        });
        return d;
    });
    data.push(obj)
    return { data };
}

export async function ManageRevuene(transInventory: Array<InventoryNS.ViewTransaction>) {
    let data = [];
    transInventory = transInventory.sort((a, b) => a.product.name.localeCompare(b.product.name));

    const productIds = new Set(transInventory.map(el => el.product_id));
    [...productIds].forEach((pID, index) => {
        let obj = {
            [MANAGE_FORM.index]: index + 1,
            [MANAGE_FORM.name]: '',
            [MANAGE_FORM.unit]: '',
            [MANAGE_FORM.price]: 0,
            [MANAGE_FORM.initial]: 0,
            [MANAGE_FORM.initialAmount]: 0,
            [MANAGE_FORM.export]: 0,
            [MANAGE_FORM.exportAmount]: 0,
            [MANAGE_FORM.import]: 0,
            [MANAGE_FORM.importAmount]: 0,
            [MANAGE_FORM.final]: 0,
            [MANAGE_FORM.finalAmount]: 0
        }
    
        transInventory.forEach(t => {
            if (pID === t.product_id) {             
                obj[MANAGE_FORM.name] = t.product?.name;
                obj[MANAGE_FORM.unit] = t.product?.unit ? t.product.unit : " ";
                obj[MANAGE_FORM.final] = +t.remain;
                obj[MANAGE_FORM.price] = t.product?.price;
                obj[MANAGE_FORM.final] = +t.remain;
                obj[MANAGE_FORM.finalAmount] = +t.remain * +obj[MANAGE_FORM.price];
                switch (t.ref) {
                    case REF_ORDER.RETAIL:
                        obj[MANAGE_FORM.export] = +obj[MANAGE_FORM.export] - +t.amount;
                        obj[MANAGE_FORM.exportAmount] = +obj[MANAGE_FORM.exportAmount] + +t.item?.price * +-t.amount;
                        break;
                    case REF_ORDER.ORDER:
                        obj[MANAGE_FORM.export] = +obj[MANAGE_FORM.export] - +t.amount;
                        obj[MANAGE_FORM.exportAmount] = +obj[MANAGE_FORM.exportAmount] + +t.item?.price * +-t.amount;
                        break;
                    case REF_ORDER.LOT:
                        if (t.amount > 0) {
                            obj[MANAGE_FORM.import] = +obj[MANAGE_FORM.import] + +t.amount;
                            obj[MANAGE_FORM.importAmount] = +obj[MANAGE_FORM.importAmount] + +obj[MANAGE_FORM.price] * +t.amount;
                        }
                        if (t.amount < 0) {
                            obj[MANAGE_FORM.export] = +obj[MANAGE_FORM.export] - +t.amount;
                            obj[MANAGE_FORM.exportAmount] = +obj[MANAGE_FORM.exportAmount] + +t.item?.price * +-t.amount;
                        }
                }
            }
        })
        data.push(obj);
    });

    let obj = {
        [MANAGE_FORM.index]: '',
        [MANAGE_FORM.name]: '',
        [MANAGE_FORM.unit]: '',
        [MANAGE_FORM.price]: '',
        [MANAGE_FORM.initial]: 'Tổng: ',
        [MANAGE_FORM.initialAmount]: 0,
        [MANAGE_FORM.export]: 'Tổng: ',
        [MANAGE_FORM.exportAmount]: 0,
        [MANAGE_FORM.import]: 'Tổng: ',
        [MANAGE_FORM.importAmount]: 0,
        [MANAGE_FORM.final]: 'Tổng:',
        [MANAGE_FORM.finalAmount]: 0
    }

    data.map(d => {
        d[MANAGE_FORM.initial] = +d[MANAGE_FORM.final] + +d[MANAGE_FORM.export] - +d[MANAGE_FORM.import];
        d[MANAGE_FORM.initialAmount] = d[MANAGE_FORM.initial] * d[MANAGE_FORM.price];
        obj[MANAGE_FORM.initialAmount] = +obj[MANAGE_FORM.initialAmount] + +d[MANAGE_FORM.initialAmount];
        obj[MANAGE_FORM.exportAmount] = +obj[MANAGE_FORM.exportAmount] + +d[MANAGE_FORM.exportAmount];
        obj[MANAGE_FORM.importAmount] = +obj[MANAGE_FORM.importAmount] + +d[MANAGE_FORM.importAmount];
        obj[MANAGE_FORM.finalAmount] = +obj[MANAGE_FORM.finalAmount] + +d[MANAGE_FORM.finalAmount];
        PRODUCT_UNIT.forEach(p => {
            if (d[MANAGE_FORM.unit] === p.code) d[MANAGE_FORM.unit] = p.label;
        });
        return d;
    });
    data.push(obj);
    return { data };
}