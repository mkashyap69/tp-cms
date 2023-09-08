'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Result, Button } from 'antd';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, the server is wrong"
      extra={
        <Button type="primary" onClick={() => reset()}>
          Back Home
        </Button>
      }
    />
  );
}
