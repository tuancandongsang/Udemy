import React, { useEffect, useState } from 'react';
import { Table, Input } from "reactstrap";
import { COVID_SERVICE } from "../../../../Constances/const";
const Test = (props) => {
    const { result, device, sampleIdCtime, sampleIdMtime, time } = props;
    const { activeTab } = props.examEditState;
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

    const current = new Date().toLocaleString('en-GB')
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

    }, [result, props.examEditState])
    if (Object.entries(result).length > 0 && device == 'Test') {
        return (
            <div className="patientResult customCard ">
                <div className="table-responsive min-h-80 df-h-58">
                    {
                        activeTab === '1' ?
                            <div className="text-left">
                                {Object.keys(result).map(key => (
                                    (key == 'device' || key == 'sample_id') ? <></> :
                                        <table className="table table-head-fixed table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>{key}</th>
                                                </tr>
                                            </thead>
                                        </table>
                                ))}
                            </div> :
                            <div className="text-left">
                                <table className="table table-head-fixed table-bordered">
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
                                                        placeholder="nhập kết quả XN"
                                                        onChange={e => props.setValueService(e, key[0], "Test")}
                                                    ></Input>
                                                    </td>
                                                </tr>
                                        })}

                                    </tbody>
                                </table>
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
                                                <Input
                                                    value={testCovidS1[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidS1[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                                <Input
                                                    value={testCovidS2[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidS2[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                                <Input
                                                    value={testCovidS3[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidS3[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                                <Input
                                                    value={testCovidS4[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidS4[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                                <Input
                                                    value={testCovidNBS1[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidNBS1[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                                <Input
                                                    value={testCovidNBS2[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidNBS2[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                                <Input
                                                    value={testCovidNBS3[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidNBS3[0][0], "Test")}
                                                ></Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày Phát Hành</td>
                                            <td colSpan='2'>{sampleIdMtime}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='3'>LƯU Ý: Kết quả test nhanh chỉ có giá trị sàng lọc ban đầu Covid-19</td>
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
                                            <td>{sampleIdCtime}</td>
                                            <td></td>
                                            <td>
                                                <Input
                                                    value={testCovidPCRS1[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidPCRS1[0][0], "Test")}
                                                ></Input>
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
                                            <td colSpan='5'>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
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
                                            <td>{sampleIdCtime}</td>
                                            <td></td>
                                            <td>
                                                <Input
                                                    value={testCovidPCRS2[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidPCRS2[0][0], "Test")}
                                                ></Input>
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
                                            <td colSpan='5'>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
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
                                            <td>{sampleIdCtime}</td>
                                            <td></td>
                                            <td>
                                                <Input
                                                    value={testCovidPCRS3[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidPCRS3[0][0], "Test")}
                                                ></Input>
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
                                            <td colSpan='5'>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
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
                                            <td>{sampleIdCtime}</td>
                                            <td></td>
                                            <td>
                                                <Input
                                                    value={testCovidPCRS4[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidPCRS4[0][0], "Test")}
                                                ></Input>
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
                                            <td colSpan='5'>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
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
                                            <td>{sampleIdCtime}</td>
                                            <td></td>
                                            <td>
                                                <Input
                                                    value={testCovidPCRS5[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidPCRS5[0][0], "Test")}
                                                ></Input>
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
                                            <td colSpan='5'>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
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
                                            <td>{sampleIdCtime}</td>
                                            <td></td>
                                            <td>
                                                <Input
                                                    value={testCovidPCRS10[0][1].value}
                                                    placeholder="nhập kết quả XN"
                                                    onChange={e => props.setValueService(e, testCovidPCRS10[0][0], "Test")}
                                                ></Input>
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
                                            <td colSpan='5'>LƯU Ý: Kết quả này chỉ có giá trị trên mẫu nhận tại Phòng khám đa khoa Việt Đoàn</td>
                                        </tr>
                                    </tbody>
                                </table>
                                }
                            </div>
                    }
                </div>
            </div >
        )
    }
}
export default Test;