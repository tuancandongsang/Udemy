import React, { useEffect, useState } from 'react';
const BS200E = (props) => {
    const { result, device } = props;
    const { activeTab } = props.examEditState;
    useEffect(() => {
    }, [result])
    if (Object.entries(result).length > 0 && device == 'BS-200E') {
        return (
            <div className="patientResult customCard ">
                <div className="table-responsive min-h-80 df-h-58">
                    {
                        activeTab === '1' ?
                            <div className="text-left">
                                {Object.keys(result).map(key => (
                                    (key == 'device' || key == 'sample_id' || key == 'ctime') ? <></> :
                                        <table className="table table-head-fixed table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>{key}</th>
                                                </tr>
                                            </thead>
                                        </table>
                                ))}
                            </div>
                            :
                            <div className="text-left">
                                <table className="table table-head-fixed table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="5">Tên máy XN : {device}</th>
                                        </tr>
                                        <tr>
                                            <th className="dw-3"> STT </th>
                                            <th className="dw-30"> Tên Xét Nghiệm </th>
                                            <th className="dw-14"> Kết quả </th>
                                            <th className="dw-24">Chỉ số bình thường</th>
                                            <th className="dw-16"> Đơn vị </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bodyTable">
                                        {Object.entries(result).map((key, index) => {
                                            return (key[0] == 'ctime' || key[0] == 'device' || key[0] == 'sample_id' || key[0] == 'name') ? <></> : <tr >
                                                <td>{index - 1}</td>
                                                <td>{key[0]}</td>
                                                <td
                                                    style={{
                                                        color: (key[1].range[1] != null && key[1].value > key[1].range[1])
                                                            ? 'red'
                                                            : (key[1].range[0] != null && key[1].value < key[1].range[0])
                                                                ? 'blue'
                                                                : '#333',
                                                    }}
                                                >{key[1].value}</td>
                                                <td>{((key[1].range[0]) == null && (key[1].range[1]) == null)
                                                    ? ''
                                                    : ((key[1].range[0] == null))
                                                        ? ('<' + (key[1]).range[1])
                                                        : ((key[1].range[1] == null))
                                                            ? ('>' + (key[1]).range[0])
                                                            : ((key[1].range[0] + '-' + key[1].range[1]))
                                                }</td>
                                                {/* <td>{(key[1].range[0] + '-' + key[1].range[1])}</td> */}
                                                <td>{key[1].unit}</td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div >
        )
    }
}
export default BS200E;