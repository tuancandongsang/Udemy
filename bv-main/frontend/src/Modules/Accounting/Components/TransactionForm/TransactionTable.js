import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { TableComponent } from '../../../../Shared/Components/Table/Table'


const TransactionTable = (props) => {
  const { items, isManager } = props;
  const [data, setData] = useState([]);
  let arrCol = [
    {
      Header: 'STT',
      accessor: 'STT'
    },
    {
      Header: 'Tên bệnh nhân',
      accessor: 'customerName'
    },
    {
      Header: 'Mã bệnh nhân',
      accessor: 'customerCode'
    },
    {
      Header: 'Số điện thoại',
      accessor: 'customerPhone'
    },
    {
      Header: 'Địa chỉ',
      accessor: 'customerAddress'
    },
    {
      Header: 'Giá tiền',
      accessor: 'amount'
    },
    {
      Header: 'Loại dịch vụ',
      accessor: 'nameService'
    },
    {
      Header: 'Phương thức thanh toán',
      accessor: 'paymentMethods'
    },
    {
      Header: 'Thời gian giao dịch',
      accessor: 'transactionTime'
    },
  ]

  const [columns, setColumns] = useState(arrCol);
  useEffect(() => {
    // if(isManager) setColumns([...arrCol, {
    //   Header: 'Option',
    //   accessor: 'cancel'
    // }])
    const data = items?.records.map((item, index) => {
      if (item.ref == 'retail') {
        return {
          nameService: "Mua thuốc lẻ",
          STT: index + 1,
          amount: <NumberFormat thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(item.amount)} />,
          paymentMethods: item.type ? (item.type === "cash" ? 'Tiền mặt' : 'Thẻ ATM') : '',
          transactionTime: (new Date(item.ctime)).toLocaleString('en-GB'),
        }
      } else {
        let nameService = ''
        if (item.order.items[0].ref_value) {
          if (item.order.items[0].ref_value.type == 'test') {
            nameService = "Xét Nghiệm Dịch Vụ"
          } else if (item.order.items[0].ref_value.type == 'exam') {
            nameService = "Khám Dịch Vụ"
          } else if (item.order.items[0].ref_value.type == 'ultrasound') {
            nameService = "Siêu Âm Dịch Vụ"
          } else if (item.order.items[0].ref_value.type == 'ent') {
            nameService = "Nội Soi Dịch Vụ"
          } else if (item.order.items[0].ref_value.type == 'x-ray') {
            nameService = "Chụp X Quang"
          } else if (item.order.items[0].ref = 'product') {
            nameService = "Mua Thuốc "
          }

        }


        const address = item.order.customer.contacts[0].address

        const district = address.district ? `-${address.district}` : ''
        const province = address.province ? `-${address.province}` : ''
        let obj =  {
          STT: index + 1,
          customerName: item.order.customer.full_name,
          customerCode: item.order.customer.code,
          customerPhone: item.order.customer.contacts[0].phone,
          customerAddress: `${district}${province}`,
          amount: <NumberFormat thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(item.amount)} />,
          nameService: nameService,
          paymentMethods: item.type ? (item.type === "cash" ? 'Tiền mặt' : 'Thẻ ATM') : '',
          transactionTime: (new Date(item.ctime)).toLocaleString('en-GB'),
        }
        // if(isManager) obj.cancel = <div onClick={e => props.onCancel(e, item.id, item.job_step.id)} className="transaction-btn-cancel middle pointer">Hủy</div>
        return obj;
      }

    })
    setData(data)
  }, [items, isManager])



  return <div >
    <TableComponent columns={columns} data={data} />
  </div>
}

export default TransactionTable;