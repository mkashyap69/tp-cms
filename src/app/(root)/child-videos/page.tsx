'use client';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Col,
  Modal,
  Row,
  Select,
  Space,
  Popconfirm,
  Table,
} from 'antd';
import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import VideoForm from '@/components/form/VideoForm';

const options = [
  { label: 'Competency 1', value: 'Competency1' },
  { label: 'Competency 2', value: 'Competency2' },
  { label: 'Competency 3', value: 'Competency3' },
];

const mockCompetency: any = [
  {
    key: '1',
    name: 'Videos 1',
    activityType: 'Activity 1',
  },
  {
    key: '2',
    name: 'Videos 2',
    activityType: 'Activity 2',
  },
  {
    key: '3',
    name: 'Videos 3',
    activityType: 'Activity 3',
  },
  {
    key: '4',
    name: 'Videos 4',
    activityType: 'Activity 4',
  },
  {
    key: '5',
    name: 'Videos 5',
    activityType: 'Activity 5',
  },
  {
    key: '6',
    name: 'Videos 6',
    activityType: 'Activity 6',
  },
];

export default function Child() {
  const [dataSource, setDataSource] = useState([...mockCompetency]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePopConfirm, setDeletePopConfirm] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  console.log({ isLoaded, userId, sessionId, token: getToken() });
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const columns = [
    {
      title: 'Video',
      dataIndex: 'name',
      width: '35%',
    },
    {
      title: 'Video Name',
      dataIndex: 'activityType',
      width: '30%',
    },
    {
      title: 'Week',
      width: '25%',
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
            onClick={() => setModalOpen(true)}
          />
          <Popconfirm title="Sure to delete?" onConfirm={() => console.log()}>
            <Button
              icon={<DeleteOutlined />}
              style={{
                color: '#1a73e8',
                borderColor: '#1a73e8',
              }}
              onClick={() => setDeletePopConfirm(true)}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div>
        <h4 style={{ marginTop: '20px' }}>Child Videos</h4>
        <Row justify="space-between">
          <Col span={9}>
            <Alert
              message="You can add new videos or edit the existing ones"
              type="info"
              showIcon
              banner
            />
          </Col>
          <Col span={3}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
            >
              Add Videos
            </Button>
          </Col>
        </Row>
        <Col span={8} className="mt-5">
          <Select
            placeholder="Select Competency"
            defaultValue={'Competency1'}
            onChange={handleChange}
            style={{ width: '100%' }}
            options={options}
          />
        </Col>
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
      <Modal
        title="Add Child Videos"
        centered
        footer={[]}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <VideoForm
          closeForm={() => setModalOpen(false)}
          selectedVideo={{}}
          updateOneVideo={{}}
          addNewVideo={{}}
          mode="Create"
        />
      </Modal>
    </>
  );
}
