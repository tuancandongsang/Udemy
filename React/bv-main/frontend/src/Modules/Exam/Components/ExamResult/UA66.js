import React, { useEffect, useState } from 'react';
const UA66 = (props) => {
    const { result, device } = props;
    const { activeTab } = props.examEditState;
    useEffect(() => {
    }, [result])
    return (
        <>
            {Object.entries(result).length > 0 && device == 'UA-66' &&
                <div className="patientResult customCard ">
                    <div className="table-responsive min-h-80 df-h-58">
                        {
                            activeTab === '1' ?
                                <div className='text-left'>
                                    <table className="table table-head-fixed table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Tổng phân tích nước tiểu</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                :
                                <div className="text-left">
                                    <table className="table table-head-fixed table-bordered">
                                        <thead>
                                            {/* <tr>
                                                <th colspan="4">Tên máy XN : {device}</th>
                                            </tr> */}
                                            <tr>
                                                <th className="dw-3"> STT </th>
                                                <th className="dw-30"> Tên Xét Nghiệm </th>
                                                <th className="dw-14"> Kết quả </th>
                                                <th className="dw-24">Chỉ số bình thường</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bodyTable">
                                            {Object.entries(result).map((key, index) => {
                                                return (
                                                    key[0] == 'ctime' || key[1].value == '' || key[0] == 'device' || key[0] == 'sample_id' || key[0] == 'name') ? <></> : <tr >
                                                    <td>{index}</td>
                                                    <td>{key[0]}</td>
                                                    <td
                                                        style={{
                                                            color: ((key[0] === 'URO' && key[1].value != 'norm.') || (key[0] === 'SG' && key[1].value > key[1].range[1]) || (key[0] === 'pH' && key[1].value > key[1].range[1]) || key[1].value === '+' || key[1].value === '2+' || key[1].value === '3+'|| key[1].value === '4+')
                                                                ? 'red'
                                                                : (key[0] === 'SG' && key[1].value < key[1].range[0]) || (key[0] === 'pH' && key[1].value < key[1].range[0])
                                                                    ? 'blue'
                                                                    : '#333',
                                                        }}
                                                    >{key[1].value}</td>
                                                    <td>{((key[1].range[0]) === 'Negative') ? (key[1].range[0]) : ((key[1].range[0]) === 'Normal') ? (key[1].range[0]) : (key[1].range[0] + '-' + key[1].range[1])} </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
                </div >

            }
        </>
    )
}
export default UA66;