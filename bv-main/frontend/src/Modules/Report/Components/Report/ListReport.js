import React, { Component, Fragment } from 'react';
import { Button, Row, Col, Label, Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LineChart, ONE_DAY, ReportService } from '../Shared';

class ListReport extends Component {
    constructor(props) {
        super(props);
        let today = new Date().toISOString();
        let endDate = today.substr(0, 10);
        let lastMonth = new Date(new Date(endDate) - 50 * ONE_DAY).toISOString(); 
        let startDate = lastMonth.substr(0, 10);
        this.state = {
            notiMessage: '',
            listData: {},
            listReport: [],
            total: 0,
            startDate,
            endDate,
            arrDay: []
        };
    }

    componentDidMount() {
        this.getListReport();
    }

    onSubmit() {
        console.log('report');
        this.getListReport();
    }

    getListReport() {
        const { startDate, endDate, arrDay } = this.state;
        const query = {
            // interval: 'day',
            start_date: startDate,
            end_date: endDate,
            // page: 1,
            // size: 30
        }
        ReportService.getListReport(query)
        .then(res => {
            let listData = res.data;
            let listReport = [];
            let total = 0;
            let max = 0;
            let min
            let minDate = 0;
            let maxDate;
            listData.map(el => {
                let date = new Date(el.ctime).toISOString();
                let ios = date.substr(0,10);
                if(!arrDay.includes(ios)) arrDay.push(ios);
                el.ios = ios;
                total += +el.amount;
                return el;
            })
            arrDay.forEach(d => {
                let obj = {
                    label: d[8] + d[9] + "-" + d[5] + d[6],
                    value: 0
                }
                listData.forEach(l => {
                    if(d === l.ios) {
                        obj.value += +l.amount
                    }
                })
                listReport.push(obj)
            })
            listReport.forEach(l => {
                if(max < l.value) {
                    max = l.value
                    maxDate = l.label
                }
                if(!min) {
                  
                    min = l.value;
                    minDate = l.label;
                }else if(min > l.value) {
                    min = l.value
                    minDate = l.label
                }
            })
            this.setState({
                listData,
                listReport,
                total,
                max,
                maxDate,
                min,
                minDate
            });
        }).catch(err => {
            console.log(err);
            this.setState({notiMessage: 'Lỗi vui lòng thử lại!'})
        });
    }


    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
    render() {
        let {startDate, endDate, listReport, total, max, maxDate, listData, min, minDate} = this.state;
        let arr = listData.records? listData.records.length > 0 ? listData.records : [] : [];
        // let item = arr.map((a, i) => {
        //     return (
        //         <tr>
        //             <th key={i} scope="row">{i++}</th>
        //             <td>{a.date}</td>
        //             <td></td>
        //             <td>{new Intl.NumberFormat('de-DE').format(a.amount)}đ</td>
        //         </tr>
        //     )
        // })
        return (
            <Fragment>
                <Row>
                    <Col xs={{ size : 10, offset: 1 }} >
                        <Row>
                            <Col xs="9"> 
                                <div className="report-box-shadow">
                                    <p className="title-card">Today</p>
                                    <div style={{ 'minHeight' : '500px' }}>
                                        <LineChart  color="#28b76b" title="Doanh thu" data={listReport}/>
                                    </div>
                                </div>
                            </Col>
                            <Col xs="3">
                                <div className="h-50 report-box-shadow">
                                    <p className="title-card">Thống kê</p>
                                    <div className="report-total">{new Intl.NumberFormat('de-DE').format(total)} đ</div>
                                    <div className="title-card">Doanh thu cao nhất: {new Intl.NumberFormat('de-DE').format(max)} đ </div>
                                    <div className="title-card">Ngày: {maxDate} </div>
                                    <div className="title-card">Doanh thu thấp nhất: {new Intl.NumberFormat('de-DE').format(min)} đ </div>
                                    <div className="title-card">Ngày: {minDate} </div>
                                </div>
                                <div style={{ marginTop: '73px' }} className="h-50 report-box-shadow mr-top-30">
                                    <p className="title-card">Chọn ngày bắt đầu</p>
                                    <Input type="date" name="startDate" value={startDate} onChange={this.onChange} />
                                    <p className="title-card mr-top-20">Chọn ngày kết thúc</p>
                                    <Input type="date" name="endDate" value={endDate} onChange={this.onChange} />
                                    <div className="option"><Button onClick={() => this.onSubmit()} >Chọn</Button></div>
                                </div>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col xs="9">
                                <div className="report-box-shadow ">
                                    <Table>
                                        <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>Ngày</th>
                                            <th>Lượt khám</th>
                                            <th>Tổng tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col xs="3">
                                <div className="h-100 report-box-shadow">
                                    <p className="title-card">Chọn ngày bắt đầu</p>
                                    <Input type="date" name="startDate" value={startDate} onChange={this.onChange} />
                                    <p className="title-card mr-top-20">Chọn ngày kết thúc</p>
                                    <Input type="date" name="endDate" value={endDate} onChange={this.onChange} />
                                </div>
                            </Col>
                        </Row> */}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default ListReport;