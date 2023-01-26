import React, { PropsWithChildren } from 'react';
import Nav from './Nav';
import Login from './Login';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container'>
      <Login />
      <Nav />
      {children}
      <style jsx>
        {`
          .container {
            max-width: 1024px;
            margin: auto;
          }

          @media (max-width: 800px) {
            .container {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AppLayout;
