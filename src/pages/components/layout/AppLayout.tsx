import React, { PropsWithChildren } from 'react';
import Nav from './Nav';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container'>
      <Nav />
      {children}
      <style jsx>
        {`
          .container {
            width: 1024px;
            margin: auto;
          }
        `}
      </style>
    </div>
  );
};

export default AppLayout;
