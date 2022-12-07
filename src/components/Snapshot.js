import { Card, Col, Row } from 'antd';

export function Snapshot() {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Gas" bordered={false}>
            1,147,646.50
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Diesol" bordered={false}>
            0
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Propane" bordered={false}>
            0
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Electricity" bordered={false}>
            4.75
          </Card>
        </Col>
       
      </Row>
    </div>
  )
}