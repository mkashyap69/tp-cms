'use client';
import React, { useState } from 'react';
import DetailCard from '@/components/shared/Card';
import { Space, Modal } from 'antd';
import { Gallery } from '@/components/form/Gallery';
import { useFetch } from '@/hooks/useFetch';
import axios from 'axios';

const fetchAllDashboard = async () => {
  return await axios.get('https://jsonplaceholder.typicode.com/todos/1');
};

export default function HomePage() {
  const [visible, toggleGallery] = useState(false);
  const [page, setPage] = useState(1);
  const [imageAsset, setImageAsset] = useState<any>({});
  const [thumbnail, setThumbnail] = useState('');
  // const { data } = useFetch(fetchAllDashboard, 'todo', [], {});
  // console.log({ data });
  return (
    <>
      <Space size="middle" align="center" wrap={true}>
        <DetailCard
          title="Onboarding Video"
          description="Onboarding Video"
          img="https://d3qp3qpjqb4t2b.cloudfront.net/image/Others/week1/UI_Change_1a.png"
          handleEditClick={() => toggleGallery(true)}
        />
        <DetailCard
          title="Homepage Video"
          description="Homepage Video"
          img="https://d3qp3qpjqb4t2b.cloudfront.net/image/Others/week1/Week_Switch_Final_3.png"
          handleEditClick={() => toggleGallery(true)}
        />
        <DetailCard
          title="Onboarding Image"
          description="Onboarding Image"
          img="https://d3qp3qpjqb4t2b.cloudfront.net/image/Others/week1/UI_Change_1a.png"
          handleEditClick={() => toggleGallery(true)}
        />
        <DetailCard
          title="Home Banner"
          description="Home Banner"
          img="https://d3qp3qpjqb4t2b.cloudfront.net/image/Others/week1/Week_Switch_Final_3.png"
          handleEditClick={() => toggleGallery(true)}
        />
      </Space>
      <Modal
        bodyStyle={{ height: '520px', overflowY: 'scroll' }}
        width={1344}
        title="Assets"
        visible={visible}
        onOk={() => {
          setThumbnail(imageAsset?.url ?? '');
          toggleGallery(false);
        }}
        onCancel={() => {
          setThumbnail('');
          toggleGallery(false);
        }}
      >
        <Gallery
          tab="image"
          onSelect={(asset: React.SetStateAction<{}>) => {
            setImageAsset(asset);
          }}
          value={thumbnail}
          page={page}
          setPage={(e: React.SetStateAction<number>) => setPage(e)}
        />
      </Modal>
    </>
  );
}
