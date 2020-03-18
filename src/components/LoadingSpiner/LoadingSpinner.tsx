import * as React from 'react';

export const LoadingSpinner: React.FC<{ isShown: boolean }> = ({ children, isShown = true }) =>
  isShown ? (
    <div className='spinner-border' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  ) : (
    <>{children}</>
  );
