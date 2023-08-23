import React, { useEffect, useState } from 'react';
import logo from '../../../../../Asset/Img/logoPK.png';
import { COVID_SERVICE } from "../../../../../Constances/const";
import { Table, Input } from "reactstrap";
const Test = (props) => {
    const { result, device, sampleIdMtime, sampleIdCtime, time } = props;
    const [testCovidS1, setTestCovidS1] = useState([])
    const [testCovidS2, setTestCovidS2] = useState([])
    const [testCovidS3, setTestCovidS3] = useState([])
    const [testCovidS4, setTestCovidS4] = useState([])
    const [testCovidNBS1, setTestCovidNBS1] = useState([])
    const [testCovidNBS2, setTestCovidNBS2] = useState([])
    const [testCovidNBS3, setTestCovidNBS3] = useState([])
    const [testCovidPCRS1, setTestCovidPCRS1] = useState([])
    const [testCovidPCRS2, setTestCovidPCRS2] = useState([])
    const [testCovidPCRS3, setTestCovidPCRS3] = useState([])
    const [testCovidPCRS4, setTestCovidPCRS4] = useState([])
    const [testCovidPCRS5, setTestCovidPCRS5] = useState([])
    const [testCovidPCRS10, setTestCovidPCRS10] = useState([])
    const current = new Date().toLocaleString()
    useEffect(() => {
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_FAST_1
            })
            setTestCovidS1(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_FAST_2
            })
            setTestCovidS2(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_FAST_3
            })
            setTestCovidS3(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_FAST_4
            })
            setTestCovidS4(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_NB_FAST_1
            })
            setTestCovidNBS1(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_NB_FAST_2
            })
            setTestCovidNBS2(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_NB_FAST_3
            })
            setTestCovidNBS3(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_PCR_1
            })
            setTestCovidPCRS1(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_PCR_2
            })
            setTestCovidPCRS2(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_PCR_3
            })
            setTestCovidPCRS3(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_PCR_4
            })
            setTestCovidPCRS4(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_PCR_5
            })
            setTestCovidPCRS5(testCovid1)
        }
        if (Object.entries(result).length > 0) {
            let testCovid1 = Object.entries(result).filter(e => {
                return e[0] === COVID_SERVICE.COV_PCR_10
            })
            setTestCovidPCRS10(testCovid1)
        }
    }, [result])
    if (Object.entries(result).length > 0 && device == 'Test') {
        return (
            <div className="patientResult  ">
                <div className="table-responsive ">
                    <div className="text-left" style={{ padding: '10px' }} >
                        {testCovidS1.length < 1 && testCovidS2.length < 1 && testCovidS3.length < 1 && testCovidS4.length < 1 && testCovidNBS1.length < 1
                            && testCovidNBS2.length < 1 && testCovidNBS3.length < 1 && testCovidPCRS1.length < 1 && testCovidPCRS2.length < 1 && testCovidPCRS3.length < 1
                            && testCovidPCRS4.length < 1 && testCovidPCRS5.length < 1 && testCovidPCRS10.length < 1
                            && <table className="table table-head-fixed table-bordered">
                                <thead>
                                    <tr>
                                        <th className="dw-3"> STT </th>
                                        <th className="dw-30"> Tên Xét Nghiệm </th>
                                        <th className="dw-14"> Kết quả </th>
                                    </tr>
                                </thead>
                                <tbody className="bodyTable">
                                    {Object.entries(result).map((key, index) => {
                                        return (key[0] == 'ctime' || key[0] == 'device' || key[0] == 'sample_id' || key[0] === COVID_SERVICE.COV_FAST_1)
                                            || key[0] === COVID_SERVICE.COV_FAST_3 || key[0] === COVID_SERVICE.COV_FAST_4 || key[0] === COVID_SERVICE.COV_NB_FAST_1 ||
                                            key[0] === COVID_SERVICE.COV_NB_FAST_2 || key[0] === COVID_SERVICE.COV_NB_FAST_3 || key[0] === COVID_SERVICE.COV_FAST_2 ||
                                            key[0] === COVID_SERVICE.COV_PCR_1 || key[0] === COVID_SERVICE.COV_PCR_2 || key[0] === COVID_SERVICE.COV_PCR_3 || key[0] === COVID_SERVICE.COV_PCR_4 || key[0] === COVID_SERVICE.COV_PCR_5 || key[0] === COVID_SERVICE.COV_PCR_10
                                            ? <></> : <tr >
                                                <td>{index}</td>
                                                <td>{key[0]}</td>
                                                <td>  <Input
                                                    value={key[1].value}
                                                ></Input>
                                                </td>
                                            </tr>
                                    })}
                                </tbody>
                            </table>
                        }
                        {testCovidS1.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidS1[0][0]}
                                    </td>
                                    <td>
                                        {testCovidS1[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidS2.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidS2[0][0]}
                                    </td>
                                    <td>
                                        {testCovidS2[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidS3.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidS3[0][0]}
                                    </td>
                                    <td>
                                        {testCovidS3[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidS4.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidS4[0][0]}
                                    </td>
                                    <td>
                                        {testCovidS4[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidNBS1.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidNBS1[0][0]}
                                    </td>
                                    <td>
                                        {testCovidNBS1[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidNBS2.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidNBS2[0][0]}
                                    </td>
                                    <td>
                                        {testCovidNBS2[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidNBS3.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Loại bệnh phẩm </th>
                                    <th className="dw-14"> Phương pháp xét nghiệm </th>
                                    <th className="dw-14">Kết quả xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch khẩu hầu
                                    </td>
                                    <td>
                                        {testCovidNBS3[0][0]}
                                    </td>
                                    <td>
                                        {testCovidNBS3[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ngày Phát Hành</td>
                                    <td colSpan='2'>{sampleIdMtime}</td>
                                </tr>
                                <tr>
                                <td colSpan='3' style={{color : 'red'}}>
                                        LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19<br></br>
                                        Đề nghị làm thêm PCR để khẳng định
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidPCRS1.length > 0 && <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th className="dw-30"> Mô tả bệnh phẩm </th>
                                    <th className="dw-14"> Kĩ thuật </th>
                                    <th className="dw-14">Ngày thực hiện</th>
                                    <th className="dw-14">Lần xét nghiệm</th>
                                    <th className="dw-14">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch ngoáy họng
                                    </td>
                                    <td>
                                        Realtime
                                        RT-PCR
                                    </td>
                                    <td>
                                        {sampleIdCtime}
                                    </td>
                                    <td></td>
                                    <td>
                                        {testCovidPCRS1[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>KẾT LUẬN</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>ĐỀ NGHỊ</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>Thời gian trả kết quả</td>
                                    <td colSpan='4'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan='5' style={{color : 'red'}}>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidPCRS2.length > 0 && <table className="table table-head-fixed table-bordered">
                        <thead>
                                <tr>
                                    <th className="dw-30"> Mô tả bệnh phẩm </th>
                                    <th className="dw-14"> Kĩ thuật </th>
                                    <th className="dw-14">Ngày thực hiện</th>
                                    <th className="dw-14">Lần xét nghiệm</th>
                                    <th className="dw-14">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch ngoáy họng
                                    </td>
                                    <td>
                                        Realtime
                                        RT-PCR
                                    </td>
                                    <td>
                                        {sampleIdCtime}
                                    </td>
                                    <td></td>
                                    <td>
                                        {testCovidPCRS2[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>KẾT LUẬN</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>ĐỀ NGHỊ</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>Thời gian trả kết quả</td>
                                    <td colSpan='4'>{sampleIdMtime}</td>
                                </tr>
                                <tr>
                                    <td colSpan='5' style={{color : 'red'}}>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidPCRS3.length > 0 && <table className="table table-head-fixed table-bordered">
                        <thead>
                                <tr>
                                    <th className="dw-30"> Mô tả bệnh phẩm </th>
                                    <th className="dw-14"> Kĩ thuật </th>
                                    <th className="dw-14">Ngày thực hiện</th>
                                    <th className="dw-14">Lần xét nghiệm</th>
                                    <th className="dw-14">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch ngoáy họng
                                    </td>
                                    <td>
                                        Realtime
                                        RT-PCR
                                    </td>
                                    <td>
                                        {sampleIdCtime}
                                    </td>
                                    <td></td>
                                    <td>
                                        {testCovidPCRS3[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>KẾT LUẬN</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>ĐỀ NGHỊ</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>Thời gian trả kết quả</td>
                                    <td colSpan='4'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan='5' style={{color : 'red'}}>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidPCRS4.length > 0 && <table className="table table-head-fixed table-bordered">
                        <thead>
                                <tr>
                                    <th className="dw-30"> Mô tả bệnh phẩm </th>
                                    <th className="dw-14"> Kĩ thuật </th>
                                    <th className="dw-14">Ngày thực hiện</th>
                                    <th className="dw-14">Lần xét nghiệm</th>
                                    <th className="dw-14">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch ngoáy họng
                                    </td>
                                    <td>
                                        Realtime
                                        RT-PCR
                                    </td>
                                    <td>
                                        {sampleIdCtime}
                                    </td>
                                    <td></td>
                                    <td>
                                        {testCovidPCRS4[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>KẾT LUẬN</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>ĐỀ NGHỊ</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>Thời gian trả kết quả</td>
                                    <td colSpan='4'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan='5' style={{color : 'red'}}>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidPCRS5.length > 0 && <table className="table table-head-fixed table-bordered">
                        <thead>
                                <tr>
                                    <th className="dw-30"> Mô tả bệnh phẩm </th>
                                    <th className="dw-14"> Kĩ thuật </th>
                                    <th className="dw-14">Ngày thực hiện</th>
                                    <th className="dw-14">Lần xét nghiệm</th>
                                    <th className="dw-14">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch ngoáy họng
                                    </td>
                                    <td>
                                        Realtime
                                        RT-PCR
                                    </td>
                                    <td>
                                        {sampleIdCtime}
                                    </td>
                                    <td></td>
                                    <td>
                                        {testCovidPCRS5[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>KẾT LUẬN</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>ĐỀ NGHỊ</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>Thời gian trả kết quả</td>
                                    <td colSpan='4'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan='5' style={{color : 'red'}}>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                        {testCovidPCRS10.length > 0 && <table className="table table-head-fixed table-bordered">
                        <thead>
                                <tr>
                                    <th className="dw-30"> Mô tả bệnh phẩm </th>
                                    <th className="dw-14"> Kĩ thuật </th>
                                    <th className="dw-14">Ngày thực hiện</th>
                                    <th className="dw-14">Lần xét nghiệm</th>
                                    <th className="dw-14">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                <tr >
                                    <td>Dịch tỵ hầu<br></br>
                                        Dịch ngoáy họng
                                    </td>
                                    <td>
                                        Realtime
                                        RT-PCR
                                    </td>
                                    <td>
                                        {sampleIdCtime}
                                    </td>
                                    <td></td>
                                    <td>
                                        {testCovidPCRS10[0][1].value}
                                    </td>
                                </tr>
                                <tr>
                                    <td>KẾT LUẬN</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>ĐỀ NGHỊ</td>
                                    <td colSpan='4'></td>
                                </tr>
                                <tr>
                                    <td>Thời gian trả kết quả</td>
                                    <td colSpan='4'>{time ? time : ''}</td>
                                </tr>
                                <tr>
                                    <td colSpan='5' style={{color : 'red'}}>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                </tr>
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div >
        )
    }
}
export default Test;