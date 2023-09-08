import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Image from 'next/image';
const { Meta } = Card;

export default function DetailCard({
  title,
  img,
  description,
  handleEditClick,
}: any) {
  return (
    <div>
      <Card
        style={{ width: 500 }}
        cover={<Image alt="example" src={img} width={100} height={100} />}
        actions={[<EditOutlined key="edit" onClick={handleEditClick} />]}
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
}
