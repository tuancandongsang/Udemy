import React from 'react';
import { Input, Col, Row, Table } from 'reactstrap';
import ReceptionService from "../../Shared/ReceptionService";
import { convertToStrDate } from "../../Shared/Util"
export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerCode: '',
            customerMatch: [],
            showSearch: false,
        }
    }

    setShowSearch = (showSearch) => {
        this.setState({ showSearch })
    }

    setCustomerCode = (customerCode) => {
        this.setState({ customerCode })
    }


    setCustomerMatch = (customerMatch) => {
        this.setState({ customerMatch })
    }

    handleSearch = async (text) => {
        this.setShowSearch(true)
        this.setCustomerCode(text)
        if (text.length >= 3) {
            let customerMatch = await ReceptionService.searchCustomer(text)
            this.setCustomerMatch(customerMatch.data)
        }

    }

    onChooseCustomer = (customer) => {
        this.props.handleReExam(customer.code)
        //this.setCustomerCode(customer.code)
        this.setShowSearch(false)
    }

    render() {
        const { customerCode, customerMatch, showSearch } = this.state
        return (
            <>
                <div className="position-relative search-1">
                    <Row >
                        <p className="title-card title-search col-form-label"><span className="material-icons">search</span> Tìm kiếm</p>
                        <Col className="px-0 ml-3">
                            <Input
                                type="search"
                                value={customerCode}
                                onChange={(ev) => { this.handleSearch(ev.target.value); }}
                                onFocus={() => this.setShowSearch(true)}
                                onBlur={() => setTimeout(() => this.setShowSearch(false), 200)}
                                placeholder="Nhập mã bệnh nhân, số điện thoại, tên bệnh nhân (không phân biệt hoa thường)..."
                            />
                            {customerCode && showSearch &&
                                <div className="position-absolute">
                                    <div>
                                        {customerCode && !customerMatch.length && 'Không tìm thấy bệnh nhân!'}
                                        {!!customerMatch.length && <Table hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Điện thoại</th>
                                                    <th>Ngày sinh</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customerMatch.map(customer => (
                                                    <tr key={customer.id} onClick={() => this.onChooseCustomer(customer)}>
                                                        <td>{customer.code}</td>
                                                        <td>{customer.full_name}</td>
                                                        <td>{customer.contacts?.[0]?.phone}</td>
                                                        <td>{convertToStrDate(customer.birthday)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>}
                                    </div>
                                </div>
                            }
                        </Col>
                    </Row>

                </div>
            </>
        )
    }
}