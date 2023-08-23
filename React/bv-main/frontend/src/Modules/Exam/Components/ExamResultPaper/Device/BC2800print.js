import React, { useEffect, useState } from 'react';
import logo from '../../../../../Asset/Img/logoPK.png';
const BS200Eprint = (props) => {
    const { result, device } = props;
    useEffect(() => {
    }, [result])
    if (Object.entries(result).length > 0 && device == 'BC-2800') {
        return (
            <div className="patientResult  ">
                <div>
                    <div className="text-left" style={{ padding: '10px' }}>
                        <table className="table table-head-fixed table-bordered">
                            <thead>
                                <tr>
                                    <th colSpan={5}>
                                        Xét nghiệm huyết học
                                    </th>
                                </tr>
                                <tr>
                                    <th className="dw-30"> Tên Xét Nghiệm </th>
                                    <th className="dw-14"> Kết quả </th>
                                    <th className="dw-24">Chỉ số bình thường</th>
                                    <th className="dw-16"> Đơn vị </th>
                                    <th className="dw-16"> Ghi chú </th>
                                </tr>
                            </thead>
                            <tbody className="bodyTable">
                                {Object.entries(result).map((key, index) => {
                                    return (key[0] == 'ctime' || key[1] == '' || key[0] == 'RDW_CV' || key[0] == 'device' || key[0] == 'Xét nghiệm số lượng và độ tập trung tiểu cầu' || key[0] == 'sample_id' || key[0] == 'name') ? <></> : <tr >
                                        <td className='examPrint'>{key[0]}</td>
                                        <td className='examPrint'
                                            style={{
                                                color: key[1].value > key[1].range[1]
                                                    ? 'red'
                                                    : key[1].value < key[1].range[0]
                                                        ? 'blue'
                                                        : '#333',
                                            }}
                                        >{key[1].value}</td>
                                        <td className='examPrint'>{((key[1].range[0]) == null && (key[1].range[1]) == null)
                                            ? ''
                                            : ((key[1].range[0] == null))
                                                ? ('<' + (key[1]).range[1])
                                                : ((key[1].range[1] == null))
                                                    ? ('>' + (key[1]).range[0])
                                                    : ((key[1].range[0] + '-' + key[1].range[1]))
                                        }</td>
                                        <td className='examPrint'>{key[1].unit}</td>
                                        <td className='examPrint'></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}
export default BS200Eprint;