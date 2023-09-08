'use client';

import {
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Alert, Button, Table, Row, Col, Modal, Space } from 'antd';
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

const mockCompetency: any = [
  {
    key: '1',
    name: 'Competency 1',
    activityType: 'Activity 1',
  },
  {
    key: '2',
    name: 'Competency 2',
    activityType: 'Activity 2',
  },
  {
    key: '3',
    name: 'Competency 3',
    activityType: 'Activity 3',
  },
  {
    key: '4',
    name: 'Competency 4',
    activityType: 'Activity 4',
  },
  {
    key: '5',
    name: 'Competency 5',
    activityType: 'Activity 5',
  },
  {
    key: '6',
    name: 'Competency 6',
    activityType: 'Activity 6',
  },
];
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}
const DraggableRow = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

export default function Competency() {
  const [dataSource, setDataSource] = useState([...mockCompetency]);
  const [modalOpen, setModalOpen] = useState(false);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <>
      <div>
        <h4 style={{ marginTop: '20px' }}>Bonus Activities</h4>
        <Row justify="space-between">
          <Col span={8}>
            <Alert
              message="Drag to change the order of activities"
              type="info"
              showIcon
              banner
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
            >
              Add Competency
            </Button>
          </Col>
        </Row>
        <Col span={8}></Col>
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              style={{
                marginTop: '20px',
              }}
              components={{
                body: {
                  row: DraggableRow,
                },
              }}
              rowKey="key"
              pagination={false}
              columns={columns}
              dataSource={dataSource}
            />
          </SortableContext>
        </DndContext>
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
