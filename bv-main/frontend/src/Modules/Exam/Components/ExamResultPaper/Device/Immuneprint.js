import React, { useEffect, useState } from 'react';
import logo from '../../../../../Asset/Img/logoPK.png';
import { Table, Input } from "reactstrap";
const IMMUNE = (props) => {
    const { result, device, deviceIMMUNE, show_form_input = true } = props;
    useEffect(() => {
    }, [deviceIMMUNE])
    const render_row = (attr, idx) => {
        if (attr.value && attr.value.range) {
            return (attr.name == 'ctime' || attr.value.value == '' || attr.label == 'device' || attr.label == 'sample_id' || attr.name == 'name') ? undefined : <tr>
                <td className='examPrint'>{idx}</td>
                <td className='examPrint'>{attr.label2}</td>
                <td className='examPrint'
                    style={{
                        color: attr.value.value > attr.value.range[1]
                            ? 'red'
                            : attr.value.value < attr.value.range[0]
                                ? 'blue'
                                : '#333',
                    }}
                >{attr.value.value}</td>
                <td className='examPrint'>
                    {((attr.value.range[0]) == null && (attr.value.range[1]) == null) ? '' : ((attr.value.range[0] + '-' + attr.value.range[1]))}
                </td>
                <td className='examPrint'>{attr.value.unit}</td>
            </tr>
        }
        return (attr.name == 'ctime' || attr.label == 'device' || attr.label == 'sample_id' || attr.name == 'name') ? undefined : <tr>
            <td className='examPrint'>{idx}</td>
            <td className='examPrint'>{attr.label2}</td>
            <td className='examPrint'></td>
            <td className='examPrint'></td>
            <td className='examPrint'></td>
        </tr>
    }
    if (Object.entries(result).length > 0 && device == 'Immune') {
        return (
            <div className="patientResult  ">
                <div className="table-responsive min-h-80 ">
                    <div className="text-left" style={{ padding: '10px' }}>
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
                                                        color: key[1].value > key[1].range[1]
                                                            ? 'red'
                                                            : key[1].value < key[1].range[0]
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
                                                <td>{key[1].unit}</td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                        {/* <div >
                            {show_form_input && deviceIMMUNE && deviceIMMUNE.attr.map((attr, index) => {
                                return attr.isInput ? <div key={index}>
                                    <label for={`IMMUNE${attr.name}`}>{attr.label}</label>
                                    <Input
                                        id={`IMMUNE${attr.name}`}
                                        className="note-time"
                                        value={attr.value.value}
                                        onChange={(e) => { props.setDeviceValue(e, deviceIMMUNE, attr) }}
                                    ></Input>
                                </div> : <></>
                            })}
                        </div> */}
                    </div>
                </div>
            </div >
        )
    }
    return <>

    </>
}
export default IMMUNE;