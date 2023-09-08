//?? Layout for auth pages

import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

export const metadata = {
  title: 'Top Parent',
  description: 'Top Parent CMS',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} main-container`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
