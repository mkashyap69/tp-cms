// eslint-disable-next-line import/no-extraneous-dependencies
import { MEDIA_TYPES, weeksArray } from '@/constants/index';
import { Col, Form, Pagination, Row, Select, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import { AssetGrid } from './AssetGrid';

const { TabPane } = Tabs;

const { Option } = Select;

export function Gallery(props: {
  onSelect: any;
  value: any;
  tab: any;
  page: any;
  setPage: any;
}) {
  const { onSelect, value, tab, page, setPage } = props;

  const [refetchItems] = useState(false);
  const [selectedTab, setTab] = useState(tab || 'image');
  const [content, setContent] = useState(value);

  const [week, setWeek] = useState(1);
  const [type, setType] = useState('Quiz');
  const handleTypeChange = (activityType: React.SetStateAction<string>) => {
    setType(activityType);
  };
  const handleWeekChange = (week: React.SetStateAction<number>) => {
    setWeek(week);
  };

  const segregatedAssets = selectedTab === 'image' ? [] : [];
  // .filter((asset) => asset.type === selectedTab)
  return (
    <>
      {selectedTab === 'image' ? (
        <Row>
          <Col span={5} offset={0}>
            <Form.Item
              name={['typeData']}
              label="Type"
              rules={[{ required: false }]}
            >
              <Select
                placeholder="Select Activity Type"
                allowClear
                onChange={handleTypeChange}
                defaultValue={type}
              >
                <Option value="Quiz">Quiz</Option>
                <Option value="Worksheet">Worksheet</Option>
                <Option value="Others">Others</Option>
                <Option value="Thumbnail">Thumbnail</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5} offset={2}>
            <Form.Item
              name={['week']}
              label="Week"
              rules={[{ required: false }]}
            >
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
      ) : (
        ''
      )}
      <Row gutter={16}>
        <Col span={24}>
          <Tabs
            defaultActiveKey={selectedTab}
            type="card"
            onChange={(value) => setTab(value)}
          >
            {MEDIA_TYPES.map(
              (type: { key: React.Key | null | undefined; label: any }) => (
                <TabPane
                  key={type.key}
                  tab={selectedTab === 'image' ? type.label : 'Videos'}
                >
                  <AssetGrid
                    isGallery
                    //@ts-ignore

                    selectedTab={selectedTab}
                    selectedContent={content}
                    assets={segregatedAssets}
                    onSelect={(value: { url: any }) => {
                      setContent(value.url);
                      onSelect(value);
                    }}
                  />
                </TabPane>
              )
            )}
          </Tabs>
        </Col>
      </Row>
      <div className="style-pagination">
        <Pagination
          showSizeChanger={false}
          total={selectedTab === 'image' ? 100 : 100}
          onChange={(e) => setPage(e)}
          defaultCurrent={selectedTab === 'image' ? 1 : 1}
        ></Pagination>
      </div>
    </>
  );
}
