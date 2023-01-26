import React, { useEffect, useState } from 'react';
import { Table, Input } from "reactstrap";
const BC2800 = (props) => {
    const { result, tab } = props;
    useEffect(() => {
    }, [result])
    return (
        <div className="patientResult ">
            <div className={tab == 1 ? "table-responsive min-h-80 df-h-58" : "table-responsive printResults"}>

                <div className="text-left">
                    <table className="table table-head-fixed table-bordered">
                        <thead>

                            <tr>
                                <th className="dw-3"> STT </th>
                                <th className="dw-30"> Tên Xét Nghiệm </th>
                                <th className="dw-14"> Kết quả </th>
                                <th className="dw-24">Chỉ số bình thường</th>
                                <th className="dw-16"> Đơn vị </th>
                            </tr>
                        </thead>
                        <tbody className="bodyTable">
                            {Object.entries(result).filter(el => el[0] !== "name" && el[0] !== "sample_id" && el[0] !== "device" && el[0] !== "ctime").map((key, index) => {
                                return <tr >
                                    <td>{index + 1}</td>
                                    <td>{key[0]}</td>
                                    <td style={{
                                        color: key[1].value > key[1].range[1]
                                            ? 'red'
                                            : key[1].value < key[1].range[0]
                                                ? 'blue'
                                                : '#333',
                                    }}
                                    >
                                        {key[1].value}</td>
                                    <td>{key[1].range.map(el => el).join("-")}</td>
                                    <td>{key[1].unit}</td>
                                </tr>
                            })}
                            {/* {result && result.attr.map((attr, idx) => render_row(attr, idx))} */}
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    )

}
export default BC2800;