import { useState } from 'react'
import { Col, Container, Row, Table, Form } from 'react-bootstrap'
import { DUMMY_DATA } from './constants'

export default function Billing() {
  const response = DUMMY_DATA.data.response
  const bills = response.billdetails
  const highDenomBills = bills.filter(x => {
    const denom = x.body.toString().trim().split(':')[1]
    return parseInt(denom) >= 100000
  })

  const [dataSource, setDataSource] = useState(bills)

  function toggleHighDenom(check: boolean) {
    if (check) {
      setDataSource(highDenomBills)
    } else {
      setDataSource(bills)
    }
  }

  return (
    <Container>
      <h1 className="my-3">Billing</h1>
      <Row>
        <Col md={4}>
          <h2 className="my-2">Billing Information</h2>
          <Row>
            <Col className="fw-bold" sm={5}>
              Biller Name
            </Col>
            <Col>{response.billername}</Col>
          </Row>
          <Row>
            <Col className="fw-bold" sm={5}>
              Inquiry ID
            </Col>
            <Col>{response.inquiryid}</Col>
          </Row>
          <Row>
            <Col className="fw-bold" sm={5}>
              Payment Type
            </Col>
            <Col>{response.paymenttype}</Col>
          </Row>
          <Row>
            <Col className="fw-bold" sm={5}>
              Response Code
            </Col>
            <Col>{response.responsecode}</Col>
          </Row>
          <Row>
            <Col className="fw-bold" sm={5}>
              Subscriber ID
            </Col>
            <Col>{response.subscriberid}</Col>
          </Row>
          <Row>
            <Col className="fw-bold" sm={5}>
              Subscriber Name
            </Col>
            <Col>{response.subscribername || <i>none</i>}</Col>
          </Row>
        </Col>
        <Col md={8}>
          <h2 className="my-2">Bill Details</h2>
          <Form.Check
            className="my-1"
            type="switch"
            label="Show high denomination transactions only"
            onChange={e => toggleHighDenom(e.target.checked)}
          />
          <Table size="sm" striped bordered hover responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Bill ID</th>
                <th>Title</th>
                <th>Currency</th>
                <th>Total Amount</th>
                <th>Admin Fee</th>
                <th>Descriptions</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {dataSource.map((x, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{x.billid}</td>
                  <td>{x.title}</td>
                  <td>{x.currency}</td>
                  <td>{x.totalamount}</td>
                  <td>{x.adminfee}</td>
                  <td>{x.descriptions || <i>None</i>}</td>
                  <td>{x.body}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
