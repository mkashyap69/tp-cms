'use client';
import { MEDIA_TYPES, weeksArray } from '@/constants';
import { Card, Col, Form, Pagination, Row, Select, Tabs } from 'antd';
import React, { useState } from 'react';
import { AssetGrid } from './AssetGrid';

const { TabPane } = Tabs;
const { Meta } = Card;
const { Option } = Select;

export function AudioGallery(props: { onSelect: any; value: any }) {
  const { onSelect, value } = props;

  const [refetchItems] = useState(false);
  const [selectedTab, setTab] = useState('audio');
  const [content, setContent] = useState(value);
  const [page, setPage] = useState(1);
  const [week, setWeek] = useState(1);
  const [type, setType] = useState('Worksheet');

  const handleTypeChange = (activityType: React.SetStateAction<string>) => {
    setType(activityType);
  };
  const handleWeekChange = (week: React.SetStateAction<number>) => {
    setWeek(week);
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <Form.Item name={['type']} label="Type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Activity Type"
              allowClear
              onChange={handleTypeChange}
              defaultValue={type}
            >
              <Option value="Worksheet">Worksheet</Option>
              <Option value="Assessment">Assessment</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={10} offset={2}>
          <Form.Item name={['week']} label="Week" rules={[{ required: false }]}>
            <Select
              placeholder="Week"
              allowClear
              onChange={handleWeekChange}
              defaultValue={week}
            >
              {weeksArray.map((week: any) => (
                <Option value={week} key={week}>{`Week ${week}`}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Tabs
            defaultActiveKey={selectedTab}
            type="card"
            onChange={(value: React.SetStateAction<string>) => setTab(value)}
          >
            {MEDIA_TYPES.map((type: { key: React.Key | null | undefined }) => (
              <TabPane key={type.key} tab="audio">
                <AssetGrid
                  isGallery
                  //@ts-ignore

                  selectedTab={selectedTab}
                  selectedContent={content}
                  assets={undefined}
                  onSelect={(value: { url: any }) => {
                    setContent(value.url);
                    onSelect(value);
                  }}
                />
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
      <div className="style-pagination">
        <Pagination
          total={100}
          defaultCurrent={1}
          showSizeChanger={false}
          onChange={(e: React.SetStateAction<number>) => setPage(e)}
        ></Pagination>
      </div>
    </>
  );
}
