import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Button, Table} from 'reactstrap';
import { Link } from "react-router-dom";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm"
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti"
import PricePolicyService from "../../Shared/PricePolicyService"
import { DataTable } from '../../../../Shared/Components/DataTable/DataTable';

const PolicyPriceManager = (props) => {
    const [policyPriceList, setPolicyPriceList] = useState([])
    const [delPolicyPriceId, setDelPolicyPriceId] = useState(null)
    const [confirmMessage, setConfirmMessage] = useState("")
    const [notiMessage, setNotiMessage] = useState("")
    const [isMounted, setIsMounted] = useState(false);
    const [headers, setHeaders] = useState(["STT", "Mã chính sách", "Tên chính sách", "Thao tác"]);
    
    useEffect(() => {
        fetchPricePolicyList()
    }, [isMounted])

    const fetchPricePolicyList = () => {
        PricePolicyService.getPricePolicyList().then(
            res => {
                const policy = res.data.map((p,index) => {
                    return {
                        id : p.id,
                        index : index + 1,
                        code : p.code,
                        name : p.name,
                        event : "",
                }})
                setPolicyPriceList(policy);
            }
        ).catch(err => console.log(err))
    }

    const delPolicyPrice = (id) => {
        return PricePolicyService.delPricePolicy(id)
    }

    const handleDelPolicyPrice = (policyPriceId) => {
        setDelPolicyPriceId(policyPriceId)
        setConfirmMessage("Bạn có muốn xóa dịch vụ này?")
    }

    const answer = (answer) => {
        if (answer) {
            delPolicyPrice(delPolicyPriceId).then(() => {
                setDelPolicyPriceId(null)
                setConfirmMessage("")
                setNotiMessage("Bạn đã cập nhật thành công!")
                setIsMounted(!isMounted);
            }).catch((err) => {
                setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
                console.log(err)
            })
        } else {
            setConfirmMessage("")
        }
    }

    const done = () => {
        setNotiMessage("")
    }

    return (
        <Fragment>
            <div className="container">
                <div className = "customCard">
                    <ModalConfirm message={confirmMessage} answer={answer}></ModalConfirm>
                    <ModalNoti message={notiMessage} done={done}></ModalNoti>
                    <h2 className="py-3">Quản lý chính sách giá</h2>
                    <Link to="/app/service/price-policy/0">
                        <Button color="success" className="mb-3 paddingBtn">Thêm mới chính sách giá</Button>
                    </Link>
                    <DataTable headers={headers} body={policyPriceList} parentCallBack={handleDelPolicyPrice}/>
                </div>
            </div>
        </Fragment>
    );
}

export default PolicyPriceManager;

