import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { ReceptionService } from '../../../Shared';
import { convertToStrDate, convertToNormDate } from "../../../Shared/Util"

const ModalFilter = (props) => {

    const [modal, setModal] = useState(false);
    const [customerMatch, setCustomerMatch] = useState([])
    const toggle = () => setModal(!modal);
    const {cm_code, cm_full_name, cm_birthday, handleReExam, cm_phoneNumber,contact_address } = props
    useEffect(() => {
       if(contact_address.value){
        return
       }
       else if(cm_birthday.value && cm_full_name.value && !cm_birthday.err ){
            handleSearch(cm_full_name.value.toUpperCase(), convertToNormDate(cm_birthday.value))
        }
    }, [cm_birthday.value, cm_full_name.value.toUpperCase()])

    const handleSearch = async (full_name, birthday) => {
        let customerMatch = await ReceptionService.getCmList({ full_name, birthday })
        setCustomerMatch(customerMatch.data)
        if (customerMatch.data.length) {
            setModal(true)
        }
    }

    const onChooseCustomer = (customer) => {
        handleReExam(customer.code)
        toggle()
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Bệnh nhân có tên {cm_full_name.value}, ngày sinh {convertToStrDate(cm_birthday.value)}</ModalHeader>
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
                            {customerMatch.map(customer => (
                                <tr key={customer.id} onClick={() => onChooseCustomer(customer)}>
                                    <td>{customer.code}</td>
                                    <td>{customer.full_name}</td>
                                    <td>{convertToStrDate(customer.birthday)}</td>
                                    <td>{customer.contacts?.[0]?.phone}</td>
                                    <td>{customer.gender === "male" ? "Nam" : "Nữ"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Thoát</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalFilter;