'use client';
import { LogoutOutlined } from '@ant-design/icons';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import { Layout } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const { Header } = Layout;

export default function LayoutHeader() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Header className="flex justify-between">
      <Image
        alt=""
        src="https://console.mobile.topparent.org/images/logo.png"
        className="demo-logo-vertical"
        width={60}
        height={20}
      />
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push('/sign-in')}>
          <div className="flex cursor-pointer gap-4">
            <LogoutOutlined style={{ color: 'white', fontSize: '1rem' }} />
            <p className="text-gray-50">Logout</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </Header>
  );
}
