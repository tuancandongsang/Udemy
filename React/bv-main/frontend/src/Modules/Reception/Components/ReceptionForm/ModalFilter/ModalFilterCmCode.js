import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { ReceptionService } from '../../../Shared';
import { convertToStrDate } from "../../../Shared/Util"
import { DATE } from '../../../../../Constances/const';

const ModalFilterCmCode = (props) => {

  const [modalC, setModalC] = useState(false);
  const [customer, setCustomer] = useState([])
  // const [customerMatch, setCustomerMatch] = useState([])
  const toggle = () => setModalC(!modalC);
  const { cm_code, handleReExam ,cm_full_name,cm_birthday} = props
  useEffect(() => {
    if(cm_birthday.value && cm_full_name.value && !cm_birthday.err){
      return
    }else if (cm_code.value && !cm_code.err &&cm_code.value!=DATE('now') &&cm_code.value.length===12) {
      handleSearch(cm_code.value)
    }
  }, [cm_code.value])

  const handleSearch = async (code) => {
    let customerMatch = await ReceptionService.getCmbyCode(code)
    // setCustomerMatch(customerMatch.data)
    let customer = customerMatch.data
    setCustomer(customer)
    if (customer.id) {
      setModalC(true)
    }
  }

  const onChooseCustomer = (customer) => {
    handleReExam(customer.code)
    toggle()
  }
  return (
    
      <Modal isOpen={modalC} toggle={toggle}>
        <ModalHeader toggle={toggle}>Bệnh nhân có mã {cm_code.value}</ModalHeader>
        <ModalBody>
          <Table hover size="sm">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên</th>
                <th>Ngày sinh</th>
                <th>Điện thoại</th>
                <th>Giới tính</th>
              </tr>
            </thead>
            <tbody>
              <tr key={customer.id}
                
               onClick={() => onChooseCustomer(customer)}
               >
                <td >{customer.code}</td>
                <td>{customer.full_name}</td>
                <td>{convertToStrDate(customer.birthday)}</td>
                <td>{customer.contacts?.[0]?.phone}</td>
                <td>{customer.gender === "male" ? "Nam" : "Nữ"}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Thoát</Button>
        </ModalFooter>
      </Modal>
    
  );
}

export default ModalFilterCmCode;