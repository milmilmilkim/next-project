import { PropsWithChildren } from 'react';

const TestLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
     {children}
    </div>
  );
};

export default TestLayout;
