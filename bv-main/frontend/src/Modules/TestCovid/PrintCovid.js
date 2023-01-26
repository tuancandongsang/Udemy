import React from 'react';
import { Col, Row, Table , Container } from 'reactstrap';
import logo from '../../Asset/Img/logoPK.png';
import logo1 from '../../Asset/Img/logo.png'
import { getAge, convertToStrDate } from '../Reception/Shared/Util';
export class PrintCovid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorInfo: {}
    }
  }
  render() {
    return (
      <Container className='TestCovid' style={{maxWidth:'210mm',maxHeight:'297mm'}}>
        {/* <img  className="logo1 " src={logo1}></img> */}
        <div className="HeaderPrint">
          <div className="logo">
            <Col sm={3}>
              <img alt="" className="image " style={{ width: '130px', height: '120px', paddingLeft: '30px', paddingTop: '40px' }} src={logo}></img>
            </Col>
            <Col sm={9} style={{padding:'0px',margin:'0px'}}>
              <p style={{ color: '#0b7529', fontSize: '150%',margin:0 }} className="header1 upper text-center">Phòng Khám Đa Khoa Việt Đoàn</p>
              <p style={{ color: '#3ca832',margin:0 }} className=" header2 upper text-center">viet doan general clinic</p>
              <p style={{ color: '#3ca832' ,margin:0}} className="header3 text-center">Địa chỉ : Bách Môn - Việt Đoàn - Tiên Du - Bắc Ninh</p>
              <p style={{ color: '#3ca832',margin:0}} className="header3 text-center">Website:phongkhamchuyengia.vn ; Điện thoại: 02222208999 - 0869968688</p>
              <p style={{ color: 'red', fontSize: '120%',margin:0 }} className='header4 text-center'> Khám tư vấn , Khám,Điều trị COVID-19 và Hậu COVID</p>
              <hr style={{ border: '5px solid #06521b', borderRadius: '5px' ,margin:0}}></hr>
            </Col>
          </div>
        </div>
        <div className='body-testCovid' style={{width:'200mm'}}>
          <div style={{display:'flex' ,flexWrap:'nowrap',justifyContent:'center'}}>
              <div style={{ border: '1px solid #333', maxWidth: '170px', height:'60px',padding:'10px',textAlign:'center',marginTop:'30px' }} className='covid-id'>
                Mã Xét nghiệm(ID): <br></br>
                {''}
              </div>
              <div className='text-center' style={{ padding: '10px',marginRight:'10mm' }}>
                <b style={{ fontSize: '150%' }}>PHIẾU XÉT NGHIỆM</b><br></br>
                <b>SARS - CoV - 2 Test Lab</b><br></br>
                <b>Bắc Ninh , Ngày {this.props.stateCovid.date}</b>
              </div>
          </div>
          <div style={{borderTop:'1px solid #333',borderBottom:'1px solid #333',margin:'0px',padding:'0px',display:'flex'}}>
              <b className='SN'>Thông tin người xét nghiệm(Informations)</b>
              <b className='XN'>Phòng xét nghiệm(Lab)</b>
          </div>
          <div style={{borderBottom:'1px solid #333',margin:'0px',display:'flex'}}>
              <b className='SN'>Họ tên(Name) :&nbsp;&nbsp;&nbsp;&nbsp;{this.props.stateCovid.name}</b>
              <b className='XN'>Người lấy mẫu(Taken by) : &nbsp;&nbsp;&nbsp;&nbsp;{this.props.stateCovid.takenBy}</b>
          </div>
          <div style={{borderBottom:'1px solid #333',margin:'0px',display:'flex'}}>
              <b style={{width:'60mm'}}>Năm sinh(Birth) : {this.props.stateCovid.birthday}</b>
              <b style={{width:'38mm'}}>Giới(Sex) : {this.props.stateCovid.gender}</b>
              <b>Loại mẫu(Sample type) : &nbsp;&nbsp;&nbsp;&nbsp;{this.props.stateCovid.sampleType}</b>
          </div>
          <div style={{borderBottom:'1px solid #333',margin:'0px',display:'flex'}}>
              <b style={{width:'60mm'}}>Điện thoại(Tell):&nbsp;{this.props.stateCovid.phoneNumber}</b>
              <b style={{width:'38mm'}}>CMT(ID):&nbsp;{this.props.stateCovid.cmt}</b>&nbsp;&nbsp;
              <b>Tình trạng mẫu(Sample type) : &nbsp;&nbsp;&nbsp;&nbsp;ĐẠT</b>
              
          </div>
          <div style={{borderBottom:'1px solid #333',margin:'0px',display:'flex'}}>
              <b className='SN'>Địa chỉ(Add):&nbsp;&nbsp;&nbsp;&nbsp;{this.props.stateCovid.address}</b>
              <b>Đơn vị(Work):&nbsp;&nbsp;&nbsp;&nbsp;{this.props.stateCovid.work}</b>
          </div>
          <div style={{borderBottom:'1px solid #333',display:'flex'}}>
          <b className='SN'>Người thực hiện:&nbsp;&nbsp;&nbsp;&nbsp;{this.props.stateCovid.technicians}</b>
              <b>Loại mẫu(Checked):&nbsp;&nbsp;Dịch tỵ hầu</b>
          </div>
          <div style={{borderBottom:'1px solid #333',display:'flex'}}>
          <b >Yêu cầu(request):          Sàng lọc Virus SARS-Cov-2(Screening)</b>
          </div>

        </div>
        <div className='table' style={{marginTop:'10px'}}>
          <b>Kết quả xét nghiệm(Result)</b>
          <table>
          <thead>
            {/* <th>
              STT
            </th> */}
            <th>
              Tên Xét nghiệm(test)
            </th>
            <th>
              Kết quả(Result)
            </th>
            <th>
              Ghi chú(Note)
            </th>
          </thead>
          <tbody className="bodyTable">
            {/* <td>

            </td> */}
            <td>
              <b>Xét nghiệm kháng nguyên Virus SARS-CoV-2<br></br>(SARS - CoV - 2 Antigen Rapid Test)</b>
            </td>
            <td>
              
            </td>
            <td>
              
            </td>
          </tbody>
          </table>
          <p style={{color:'red',fontSize:'110%'}}>Lưu ý: -Kết quả xét nghiệm Test nhanh chỉ có giá trị sàng lọc ban đầu.<br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Đề nghị làm thêm PCR để khẳng định
          </p>
          <br></br><br></br><br></br><br></br>
          <div style={{display:'flex',marginLeft:'10mm'}}>
            <div>
            <b>PHÒNG XÉT NGIỆM</b><br></br>
              <p className='SN' >(Lab Sign , ghi rõ họ tên</p><br></br><br></br><br></br>
              <b>{this.props.stateCovid.technicians}</b>
            </div>
              <div style={{marginLeft:'10mm'}}>
              <b>BÁC SĨ</b><br></br>
              <p>(Dr Sign , ghi rõ họ tên)</p>
              </div>
          </div>
        </div>
      </Container>
    )
  }
}
export default PrintCovid
