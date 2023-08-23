import React, { useEffect, useState } from 'react';
import { Table, Input } from "reactstrap";
const Test = (props) => {
    const { result, tab } = props;
    useEffect(() => {
    }, [result])
    if (Object.entries(result).length > 0) {
        return (
            <div className="patientResult  ">
                <div className={tab == 1 ? "table-responsive min-h-80 df-h-58" : "table-responsive printResults"}>


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
                                {Object.entries(result).filter(el => el[0] !== "name" && el[0] !== "device" && el[0] !== "sample_id" && el[0] !== "ctime").map((key, index) => {
                                    return (
                                        <tr >
                                            <td>{index + 1}</td>
                                            <td>{key[0]}</td>
                                            <td>{key[1].value}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}
export default Test;