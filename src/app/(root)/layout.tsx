import { Inter } from 'next/font/google';
import Providers from '@/utils/provider';
import Sidebar from '@/components/shared/Sidebar';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';

import '@/app/globals.css';
import LayoutHeader from '@/components/shared/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Top Parent',
  description: 'Top Parent CMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <SignedIn>
              <Layout style={{ minHeight: '100vh' }}>
                <LayoutHeader />
                <Layout>
                  <Sidebar />
                  <div className="m-4 p-8 overflow-y-scroll h-screen w-full">
                    {children}
                  </div>
                </Layout>
              </Layout>
            </SignedIn>
            <SignedOut>
              <h3>You are not signed in</h3>
            </SignedOut>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
