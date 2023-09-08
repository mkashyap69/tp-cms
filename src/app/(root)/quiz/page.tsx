'use client';

import { Badge, Col, Modal, Row, Select, Switch, Table } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';

const QUIZ_COLUMNS = [
  {
    title: 'Week',
    dataIndex: 'week',
    key: 'week',
    render: (text: any, record: any) => (
      <div style={{ display: 'flex' }}>
        <Badge status={'processing'} style={{ marginRight: '5px' }} />
        <Link href="quiz/week1">
          <p className="table-text">{`Week ${text}`}</p>
        </Link>
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'live',
    key: 'live',
    render: (text: any, record: any) => (
      <Switch
        defaultChecked={true}
        onChange={(checked, event) => console.log(checked, event, record)}
      />
    ),
  },

  {
    title: 'Quiz Name',
    dataIndex: 'week',
    key: 'week',
    render: (text: any, record: { week: any }) => `Week ${record.week} Quiz`,
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (text: any, record: any) => `text`,
  },
];
const mockQuiz: any = [
  {
    key: '1',
    name: 'Reward 1',
    activityType: 'Activity 1',
  },
  {
    key: '2',
    name: 'Reward 2',
    activityType: 'Activity 2',
  },
  {
    key: '3',
    name: 'Reward 3',
    activityType: 'Activity 3',
  },
  {
    key: '4',
    name: 'Reward 4',
    activityType: 'Activity 4',
  },
  {
    key: '5',
    name: 'Reward 5',
    activityType: 'Activity 5',
  },
  {
    key: '6',
    name: 'Reward 6',
    activityType: 'Activity 6',
  },
];

const options = [
  { label: 'Competency 1', value: 'Competency1' },
  { label: 'Competency 2', value: 'Competency2' },
  { label: 'Competency 3', value: 'Competency3' },
];

export default function Rewards() {
  const [dataSource, setDataSource] = useState([...mockQuiz]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <>
      <div>
        <Row justify="space-between">
          <Col span={8}>
            <Select
              placeholder="Select Competency"
              defaultValue={'Competency1'}
              onChange={handleChange}
              style={{ width: '100%' }}
              options={options}
            />
          </Col>
          <Col span={4}>
            {/* <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
            >
              Add Reward
            </Button> */}
          </Col>
        </Row>
        <Col span={8}></Col>
        <Table
          style={{
            marginTop: '20px',
          }}
          rowKey="key"
          pagination={false}
          columns={QUIZ_COLUMNS}
          dataSource={dataSource}
        />
      </div>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
}
