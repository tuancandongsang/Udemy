import React, { Component } from "react";
import { NAME_DOCTOR } from '../../../Constances/const';
class Signature extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { doctorInfo } = this.props;
        const doctorArr = [
            NAME_DOCTOR.DoThienHai.value , NAME_DOCTOR.NguyenHongSon.value, NAME_DOCTOR.TranMinhVuong.value, NAME_DOCTOR.TrinhTienLuc.value
        ]
        return (
            <div className="SignaturePrint">
                { doctorArr.includes(doctorInfo?.username) ?
                    <>
                        {
                            Object.values(NAME_DOCTOR).map(el => {
                                if (el.value == doctorInfo.username) {
                                    return (
                                        <div key={el.value}>
                                            <strong>Bác sĩ điều trị</strong><br></br>
                                            <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                            <b>{el.degree}</b><br></br>
                                            <b className="mt-5 fontsz-20">{doctorInfo?.full_name}</b><br></br>
                                           {doctorInfo?.username == NAME_DOCTOR.DoThienHai.value ?  <strong>{el.hospital}</strong> : ""}
                                        </div>
                                    )
                                }
                            })

                        }
                    </>
                    :
                    <>
                        <strong>Bác sĩ điều trị</strong><br></br>
                        <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                        <b className="mt-5 fontsz-20">{doctorInfo?.full_name}</b>
                     {/* {tab==2 ? null : <b className="mt-5 fontsz-20">{doctorInfo?.full_name}</b>}    */}
                    </>
                }

            </div>
        )
    }
}
export default Signature;