'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import theme from '@/theme/themeConfig';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient();

function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryStreamedHydration> */}
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </StyledComponentsRegistry>
      {/* </ReactQueryStreamedHydration> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
