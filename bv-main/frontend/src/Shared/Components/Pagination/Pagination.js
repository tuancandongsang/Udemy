import React, { useEffect, useState } from 'react';
import { Col, Button, Input, Row} from "reactstrap";

export const Pagination = props => {
  const { data_lenght, callBackPagination } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  useEffect(() => {
    callBackPagination(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage])
  const handleChangeCurrentPage = (index, el) => {
      const numberPage = Math.ceil(data_lenght / itemsPerPage);
      let pageNum = +1;
      if (index <= 0) {
          pageNum = +1;
      } else if (index >= numberPage) {
          pageNum = +numberPage;
      } else {
          pageNum = index;
      }
      setCurrentPage(pageNum);
  }
  const handChangeNumPerPage = (e) => {
      setItemsPerPage(+e.target.value);
  }
  const numberPage = Math.ceil(data_lenght / itemsPerPage);
  return (
        <>
            <Row className="pt-15">
                <Col>
                    <Row className="pagination-custom" >
                        <Col xs={4}>
                        <h5>Số bản ghi / trang : </h5>
                        </Col>
                        <Col xs={1} style={{"width" : "10%"}}>
                        <Input type="select" name="type" id="type" onChange={event => {handChangeNumPerPage(event)}} >
                            <option value="100">100</option>
                            <option value="50">50</option>
                            <option value="25">25</option>
                        </Input>
                        </Col>
                        <Col xs={2}>
                        { numberPage !== 0 ? <h5>{`${currentPage}-${numberPage} of ${numberPage}`}</h5> : <h5>{``}</h5> }
                        </Col>
                        <Col xs={2}>
                        <Button onClick={() => handleChangeCurrentPage(+1)}>
                            First
                        </Button> &nbsp;
                        <Button onClick={() => handleChangeCurrentPage(currentPage - 1)}>
                            &lt;&lt;
                        </Button>
                      </Col>
                      <Col xs={2}>
                        <Button onClick={() => handleChangeCurrentPage(currentPage + 1)}>
                          &gt;&gt;
                        </Button> &nbsp;
                        <Button onClick={() => handleChangeCurrentPage(numberPage)}> Last </Button>
                      </Col>
                  </Row>
                </Col>
            </Row>
        </>
    )
}
