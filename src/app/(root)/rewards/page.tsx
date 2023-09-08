'use client';

import DetailCard from '@/components/shared/Card';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Space, Table } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    key: 'sort',
  },
  {
    title: 'Activity Name',
    dataIndex: 'name',
    width: '35%',
  },
  {
    title: 'Type',
    dataIndex: 'activityType',
    width: '30%',
  },
  {
    title: 'Status',
    width: '25%',
    render: () => <Button>Enable</Button>,
  },
  {
    title: 'Actions',
    width: '30%',
    render: () => (
      <Space>
        <Button
          icon={<EditOutlined />}
          style={{
            color: '#1a73e8',
            borderColor: '#1a73e8',
          }}
        />
        <Button
          icon={<DeleteOutlined />}
          style={{
            color: '#1a73e8',
            borderColor: '#1a73e8',
          }}
        />
      </Space>
    ),
  },
];

const mockRewards: any = [
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

export default function Rewards() {
  const [dataSource, setDataSource] = useState([...mockRewards]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>
        <DetailCard
          title="Rewards Banner"
          description="Rewards Banner"
          img="https://d3qp3qpjqb4t2b.cloudfront.net/image/Others/week1/UI_Change_1a.png"
        />

        <Row justify="space-between">
          <Col span={8}>
            <h4>Rewards</h4>
          </Col>
          <Col span={4}>
            <Button icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
              Add Reward
            </Button>
          </Col>
        </Row>
        <Col span={8}></Col>
        <Table
          style={{
            marginTop: '20px',
          }}
          rowKey="key"
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
      {modalOpen && (
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
      )}
    </>
  );
}
