import * as React from 'react';

export const Container: React.FC = ({ children, ...otherProps }) => (
  <div className='container' {...otherProps}>
    {children}
  </div>
);
