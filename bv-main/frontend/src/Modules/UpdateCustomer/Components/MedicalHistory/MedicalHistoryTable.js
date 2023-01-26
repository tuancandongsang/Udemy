import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col } from 'reactstrap';
import { DATE, STATUS, STEP_TYPE } from "../../../../Constances/const";
import { ShareService } from '../../../../Shared';
import PrintMedicalHistory from "./PrintHistory/PrintMedicalHistory";
const MedicalHistoryTable = (props) => {
  let { items } = props;
  const [itemPrint, setItemPrint] = useState({});
  const [itemCkecked, setitemCkecked] = useState([]);

  const [showPrint, setShowPrint] = useState(false);
  useEffect(() => {}, [items])
  const [tab, setTab] = useState("")
  const [showListSteps, setshowListSteps] = useState(false)
  const printMedicalHistory = (item, tab) => {
    if (tab == 1) {
      setTab(tab)
      setItemPrint(item)
      setshowListSteps(true);
    }
    else {
      setTab(tab)
      setItemPrint(item)
      setShowPrint(true);
    }
  }
  const submitPrint = async () => {
   await ShareService.printhorizontal("historyMedicalPrint");
   await setShowPrint(false)
   await setshowListSteps(false);
   await setitemCkecked([]);
  }
  const onClickCheckBox = (e, item) => {
    if (e.target.checked == true) {
      itemCkecked.push(item)
    }
    else {
      itemCkecked.splice(itemCkecked.findIndex(el => el.code == item.code), 1)
    }
  }
  const onCloseShow = ()=>{
    setShowPrint(false)
    setshowListSteps(false);
    setitemCkecked([]);
  }
  return (
    <div className="MedicalHistoryTable">
      <Table hover bordered className="historyMedical">
        <thead>
          <tr>
            <th>STT</th>
            <th className="nameCm">Tên bệnh nhân</th>
            <th className="testDay">Ngày khám</th>
            <th>Dịch vụ</th>
            <th>Mã dịch vụ</th>
            <th className="optionHistory">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => {
            const stepExam = item.steps;
            stepExam.map(el => {
            })
            const service = (sv) => {
              if (sv.order.items.length > 0) {
                let serviceList = [sv.order.items.map(el => el.ref_value?.name).join(",")]
                return <div>{serviceList}</div>
              }
            }
            const code = (sv) => {
              if (sv.order) {
                let codeList = [sv.order.code]
                return <div key={codeList}>{codeList}</div>
              }
            }
            const codeExam = stepExam?.map(code);
            const serviceExam = stepExam?.map(service);
            return <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item?.ref_value?.full_name}</td>
              <td>{DATE(item.date, "DDMMYYYY")}</td>
              <td>{serviceExam}</td>
              <td >{codeExam}</td>
              {stepExam.length > 1
                ?
                <td>
                  <Button onClick={() => printMedicalHistory(item, "1")}>in chi tiết</Button>
                  <Button onClick={() => printMedicalHistory(item, "2")}>in tổng</Button>
                </td>
                :
                <td>
                  <Button onClick={() => printMedicalHistory(item, "1")}>in</Button>
                </td>
              }

            </tr>
          })}
        </tbody>
      </Table>
      <Modal isOpen={showListSteps}>
        <ModalBody>
          {
            itemPrint?.steps?.map((el, index) => {
              return (
                <Row>
                  <Col sm={8}>
                    {el.order.items.map(el => el.ref_value.name).join(",")}
                  </Col>
                  <Col sm={2}>
                    {el.code}
                  </Col>
                  <Col sm={2}>
                    {el.status !== STATUS.CANCEL ? el.type === STEP_TYPE.BUY ?<p>Đơn thuốc</p> :<Input type="checkbox"
                      onChange={(e) => onClickCheckBox(e, el)}
                    >
                    </Input> :
                      <p>
                        Đã hủy đơn
                      </p>
                    }

                  </Col>
                </Row>

              )

            })
          }
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onCloseShow()}>Hủy</Button>
          <Button onClick={() => setShowPrint(true) }>In</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showPrint}>
        <ModalBody>{
          tab == "1" ?
            <PrintMedicalHistory item={itemPrint} itemCkecked={itemCkecked} tab={tab}></PrintMedicalHistory>
            : <PrintMedicalHistory item={itemPrint} tab={tab}></PrintMedicalHistory>
        }
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onCloseShow()}>Hủy</Button>
          <Button onClick={() => submitPrint()}>In</Button>
        </ModalFooter>
      </Modal>
     

    </div>
  );
}

export default MedicalHistoryTable;