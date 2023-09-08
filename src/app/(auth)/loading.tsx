import React from 'react';
import { Spin } from 'antd';

export default function Loader() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}
    >
      <Spin size="large" tip="Please Wait..." />
    </div>
  );
}
