import React, { useEffect, useState } from 'react';
const Other = (props) => {
    const { result, tab } = props;
    useEffect(() => {
    }, [result])
    return (
        <div>
            <div className="patientResult  Other">
                <div className={tab == 1 ? "table-responsive min-h-80 df-h-58" : "table-responsive printResults"}>

                    <div className="text-left">
                        {
                            Object.entries(result).filter(el => el[0] !== "name" && el[0] !== "device" && el[0] !== "sample_id" && el[0] !== "ctime").map(parentKey => {
                                return (
                                    parentKey[1] != null ?
                                        <table className="table table-head-fixed table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="dw-14">{parentKey[0]}</th>
                                                    <th>Kết quả</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bodyTable">
                                                {
                                                    Object.entries(parentKey[1]).map((key, index) => {
                                                        return (
                                                            typeof key[1] === 'object' ?
                                                                <>
                                                                    {
                                                                        Object.entries(key[1]).map(el => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{el[0]}</td>
                                                                                    <td>{el[1]}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }</>
                                                                :
                                                                <tr>
                                                                    <td>{key[0]}</td>
                                                                    <td>{key[1]}</td>
                                                                </tr>
                                                        )
                                                    }
                                                    )}
                                            </tbody>
                                        </table>
                                        :
                                        null
                                )
                            })
                        }
                    </div>
                </div>
            </div >

        </div >
    )
}
export default Other;