'use client';

import {
  GiftOutlined,
  HomeOutlined,
  RiseOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

export default function Sidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />, undefined, () =>
      router.push('/home')
    ),
    getItem('Parent', 'parent', <TeamOutlined />, [
      getItem('Parent Videos', '2', undefined, undefined, () =>
        router.push('/parent')
      ),
      getItem('Quiz', '3', undefined, undefined, () => router.push('/quiz')),
    ]),
    getItem('Child', 'child', <UserOutlined />, [
      getItem('Child Videos', '4', undefined, undefined, () =>
        router.push('/child-videos')
      ),
      getItem('Competency Assesment', '5', undefined, undefined, () =>
        router.push('/competency-assesment')
      ),
      getItem('Pre Assesment', '6', undefined, undefined, () =>
        router.push('/pre-assesment')
      ),
      getItem('Worksheet', '7', undefined, undefined, () =>
        router.push('/worksheet')
      ),
    ]),
    getItem('Rewards', 'reward', <GiftOutlined />, [
      getItem('Rewards', '8', undefined, undefined, () =>
        router.push('/rewards')
      ),
      getItem('Cashback Redeem', '9', undefined, undefined, () =>
        router.push('/cashback-redeem')
      ),
    ]),
    getItem('Competency', '10', <RiseOutlined />, undefined, () =>
      router.push('/competency')
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width="250"
      onCollapse={(value) => setCollapsed(value)}
      style={{ padding: 0, background: 'white' }}
    >
      <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
}
