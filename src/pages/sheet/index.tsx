import React from 'react';
import useSheet from '../../hooks/queries/useSheet';

const Page = () => {
  const { data, isLoading, isError, msg } = useSheet();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {msg}</span>;
  }

  return <>{JSON.stringify(data)}</>;
};

export default Page;
