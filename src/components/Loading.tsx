import React from 'react';
import { Space, Spin } from 'antd';

const Loading: React.FC = () => (
  <Space
    size="large"
    className="flex justify-center w-full p-[100px]">
    <Spin size="large" />
  </Space>
);

export default Loading;
