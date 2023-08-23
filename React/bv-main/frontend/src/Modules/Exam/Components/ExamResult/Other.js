import React, { useEffect, useState } from 'react';
import { Table, Input } from "reactstrap";
import { OTHER_DATA } from "../../../../Constances/const"
const Other = (props) => {
    const { resultIndex, device} = props;
    useEffect(() => {
        let resultsExam = props.examEditState.resultsExam;
        Object.keys(props.examEditState.resultsExam[resultIndex]).forEach(key => {
            if (key !== "device" && key !== 'sample_id' && !resultsExam[resultIndex][key]) {
                 resultsExam[resultIndex][key] = OTHER_DATA[key]
            }
        });
        props.examEditSetState({
            resultsExam: resultsExam
        })
    }, [])

    const handleInputChange = (patientKey, key, e) => {
        let resultsExam = props.examEditState.resultsExam;
        resultsExam[resultIndex][patientKey][key] = e.target.value;
        props.examEditSetState({
            resultsExam: resultsExam
        })
    }

    const handleTriInputChange = (patientKey, key, k, e) => {
        let resultsExam = props.examEditState.resultsExam;
        resultsExam[resultIndex][patientKey][key][k] = e.target.value;
        props.examEditSetState({
            resultsExam: resultsExam
        })
    }

    const { resultsExam, activeTab } = props.examEditState;
    return (
        <div>
            {device == 'Other' &&
                Object.keys(resultsExam[resultIndex]).map(parentKey => (
                    (parentKey !== "device" && parentKey !== 'sample_id' && parentKey !== 'ctime') ?
                        <div>
                            {activeTab === '1' ?
                                <table className="table table-head-fixed table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="dw-14"> {parentKey} </th>
                                        </tr>
                                    </thead>
                                </table>
                                :
                                <div className="patientResult customCard ">
                                    <div className="table-responsive ">
                                        <div className="text-left">
                                            <table className="table table-head-fixed table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="dw-14" colSpan={2} style={{maxWidth:"15vh"}}> {parentKey} </th>
                                                        <th className="dw-30"> Kết quả </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bodyTable">
                                                    {
                                                        resultsExam[resultIndex][parentKey] ? Object.keys(resultsExam[resultIndex][parentKey]).map((key) => (
                                                            typeof resultsExam[resultIndex][parentKey][key] === "object" ?
                                                                <>
                                                                    <tr >
                                                                        <td rowSpan={Object.keys(resultsExam[resultIndex][parentKey][key]).length + 1}>{key}</td>
                                                                    </tr>
                                                                    {Object.keys(resultsExam[resultIndex][parentKey][key]).map(k => (
                                                                        <tr>
                                                                            <td>{k}</td>
                                                                            <td>
                                                                                <Input
                                                                                    value={resultsExam[resultIndex][parentKey][key][k] ? resultsExam[resultIndex][parentKey][key][k] : ''}
                                                                                    onChange={(e) => handleTriInputChange(parentKey, key, k, e)}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </> :
                                                                <tr >
                                                                    <td colSpan={2}>{key}</td>
                                                                    <td>
                                                                        <Input
                                                                            value={resultsExam[resultIndex][parentKey][key] ? resultsExam[resultIndex][parentKey][key] : ''}
                                                                            onChange={(e) => handleInputChange(parentKey, key, e)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                        )) : ""
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div >
                            }
                        </div>
                        : ""
                ))}
        </div>
    )
}
export default Other;