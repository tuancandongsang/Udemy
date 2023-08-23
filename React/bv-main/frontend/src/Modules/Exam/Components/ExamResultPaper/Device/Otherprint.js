import React, { useEffect, useState } from 'react';
import logo from '../../../../../Asset/Img/logoPK.png';
const Other = (props) => {
    const { resultIndex, device,data } = props;
    const resultsExam = data;
    useEffect(() => {
    }, [])
    return (
        <div>
            {device == 'Other' &&
                Object.keys(resultsExam[resultIndex]).map(parentKey => (
                    (parentKey !== "device" && parentKey !== 'sample_id'&& parentKey !== 'ctime') ?
                        <div className="patientResult">
                            <div className=" min-h-20 ">
                                <div className="text-left"style={{padding:'10px'}}>
                                    <table style={{border:'1px solid #333'}}>
                                        <thead>
                                            <tr>
                                                <th className="dw-14" colSpan={2}> {parentKey} </th>
                                                <th className="dw-30"> Kết quả </th>
                                                <th className="dw-20"> Ghi chú </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bodyTable">
                                            {
                                                resultsExam[resultIndex][parentKey] ? Object.keys(resultsExam[resultIndex][parentKey]).map((key) => (
                                                    typeof resultsExam[resultIndex][parentKey][key] === "object" ?
                                                        <>
                                                            <tr >
                                                                <td rowSpan={Object.keys(resultsExam[resultIndex][parentKey][key]).length+1}>{key}</td>
                                                            </tr>
                                                            {Object.entries(resultsExam[resultIndex][parentKey][key]).map(e=>(
                                                                <tr>
                                                                    <td>{e[0]}</td>
                                                                    <td>{e[1]}</td>
                                                                    <td></td>
                                                                </tr>
                                                            ))}
                                                        </> :
                                                        <tr >
                                                            <td colSpan={2}>{key}</td>
                                                            <td>
                                                                {resultsExam[resultIndex][parentKey][key] ? resultsExam[resultIndex][parentKey][key] : ''}
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                )) : ""
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div > : ""
                ))
            }
        </div>
    )
}
export default Other;