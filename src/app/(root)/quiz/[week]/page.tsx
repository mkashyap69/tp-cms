'use client';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Col,
  Modal,
  Row,
  Select,
  Badge,
  Space,
  Popconfirm,
  Table,
} from 'antd';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import AddQuizQuestionPage from '@/components/form/AddQuizQuestionPage';
import Image from 'next/image';
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

export default function QuizWeek() {
  const [dataSource, setDataSource] = useState([...mockCompetency]);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<any>(false);

  const [deletePopConfirm, setDeletePopConfirm] = useState(false);
  const { week } = useParams();

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const QUESTION_COLUMNS = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: { live: boolean }) => (
        <Badge
          status={record.live === true ? 'processing' : 'default'}
          style={{ marginRight: '5px' }}
        />
      ),
    },
    {
      title: 'Question Title',
      dataIndex: 'question',
      key: 'question',
      render: (
        text:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | React.PromiseLikeOfReactNode
          | null
          | undefined
      ) => (
        <div>
          <p
            style={{
              whiteSpace: 'nowrap',
              width: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: '0px',
            }}
          >
            {text}
          </p>
        </div>
      ),
    },
    {
      title: 'Question Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        if (text === 'Text' || text === 'text') return 'Text Ques_Text Based';
        return 'Text Ques_Image Based';
      },
    },
    {
      title: 'Options',
      dataIndex: 'option',
      key: 'option',
      render: (text: string | any[]) => `${text?.length}`,
    },
    {
      title: 'Answer',
      dataIndex: 'answerIndex',
      key: 'answerIndex',
      render: (
        text: string | number,
        record: {
          type: string;
          option: { [x: string]: string | undefined };
          answerIndex: string | number | undefined;
        }
      ) => {
        if (record?.type === 'text') {
          return (
            <p
              style={{
                whiteSpace: 'nowrap',
                width: '150px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: '0px',
              }}
            >
              {' '}
              {record?.option?.[text] ? record?.option?.[text] : ''}
            </p>
          );
        }
        return (
          <>
            <Image
              alt=""
              style={{ height: '100px', width: '100px' }}
              src={''}
            />
          </>
        );
      },
    },
    {
      title: 'More',
      render: (text: any, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            style={{ color: '#1a73e8', borderColor: '#1a73e8' }}
            onClick={() => setModalOpen(true)}
          />
          &nbsp;&nbsp;&nbsp;
          <Popconfirm
            placement="bottomRight"
            title="Are you sure you want to delete all the selected entries?"
            onConfirm={() => {}}
            okType="danger"
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ color: '#1a73e8', borderColor: '#1a73e8' }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <div>
        <h4 className="mb-5">You are in {week}</h4>
        <Row justify="space-between">
          <Col span={9}>
            <Alert
              message="You can add new quiz questions or edit the existing ones"
              type="info"
              showIcon
              banner
            />
          </Col>
          <Col span={3}>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setMode('Create');
                setModalOpen(true);
              }}
            >
              Add Videos
            </Button>
          </Col>
        </Row>
        <Table
          className="mt-10"
          rowKey="key"
          pagination={false}
          //@ts-ignore

          columns={QUESTION_COLUMNS}
          dataSource={dataSource}
        />
      </div>
      <Modal
        title="Add Videos"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[]}
      >
        <AddQuizQuestionPage
          // selectedQuestion={undefined}
          //@ts-ignore

          mode={''}
          addNewQuestion={''}
          updateQuestion={''}
          week={week}
          closeForm={() => {
            setModalOpen(false);
            // setSelectedQuestion({ option: [] });
          }}
        />
      </Modal>
    </>
  );
}
