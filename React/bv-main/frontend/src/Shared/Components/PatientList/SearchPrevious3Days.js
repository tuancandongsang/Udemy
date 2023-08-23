import React from 'react';
import { getAge } from "../../../Modules/Reception/Shared/Util";
import { STATUS, IOS_DATE, splitRegion, JOB_STEP_STATUS_VN } from "../../../Constances/const";
import { Util } from "../../../Helper/Util";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class SearchPrevious3Days extends React.Component {
    render() {
        let { isOpenModalSearch, patientList, outModalSearch, onSelectJobStep, selectTab, mode } = this.props;
        const location = JSON.parse(sessionStorage.getItem("location"));
        let itemPatient = patientList.length > 0  &&
        patientList.map((p, index) => {
            return (
                            <tr
                                onClick={(e) => {onSelectJobStep(p)
                                                outModalSearch(false)
                                                mode === "exam" ?
                                                p.status === STATUS.READY  ?
                                                selectTab('1') : selectTab('3') 
                                                : selectTab('1')
                                            
                                            }
                                }
                            //   ${p.seen === false ? "notiResult" : ""}`} // không sửa
                                key={p.id}
                            > 
                        
                            <td className="dw-10">{IOS_DATE(p.ctime)}</td>
                            <td>{p.order.customer.code}</td>
                            <td className="dw-60">
                                <div>{p.order.customer.full_name}</div>
                            </td>
                            <td>
                                {p.order.customer.gender == "male"
                                    ? "nam"
                                    : "nữ"}
                            </td>
                            <td>
                                {getAge(
                                    new Date(p.order.customer.birthday)
                                        .toLocaleString("en-GB")
                                        .slice(0, 10)
                                )}
                            </td>
                            <td>{p.order.customer.contacts[0].phone}</td>
                            <td>
                            {`${splitRegion(p.order.customer?.contacts[0].address.ward)}-${splitRegion(p.order.customer?.contacts[0].address.district)}-${splitRegion(p.order.customer?.contacts[0].address.province)}`}
                            </td>
                            {mode === "exam" ? 
                                <td>
                                    {
                                        JOB_STEP_STATUS_VN[p.status]
                                    }
                                </td>
                            : mode === "doctor" ? "Chờ khám" : null}
                            
                        </tr>
            );
        }) 
        return (
            <div className="modalConfirmContainer">
                <Modal isOpen={isOpenModalSearch} >
                    <ModalHeader >Thông Báo!</ModalHeader>
                    <ModalBody>
                        {
                            patientList.length > 0 ?
                            <table
                            className="table table-head-fixed table-bordered"
                            onKeyDown={(e) => Util.onKeyDown(e)}
                            data-index="1"
                        >
                                <thead>
                                    <tr>
                                        <th className="dw-5">Ngày</th>
                                        <th className="dw-15">Mã BN</th>
                                        <th className="dw-60">Bệnh nhân</th>
                                        <th>Giới</th>
                                        <th>Tuổi</th>
                                        <th>SĐT</th>
                                        <th>Địa chỉ</th>
                                        { mode === "other" ? null : 
                                        <th>Trạng thái</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemPatient}
                                </tbody>
                            </table>
                            : 
                            <h1 className='text-center'> Không tìm thấy bệnh nhân này trong {location.name}!!!</h1>
                        }
                        
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="danger" onClick={() => { outModalSearch(false) }}>Thoát</Button>
                    </ModalFooter> 
                </Modal>
            </div>
        );
    }
}

export default SearchPrevious3Days;