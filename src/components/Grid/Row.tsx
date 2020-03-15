import * as React from 'react';
import cx from 'classnames';

export const Row: React.FC<{ additionalClassNames?: string }> = ({
  additionalClassNames = '',
  children
}) => <div className={cx('row', additionalClassNames)}>{children}</div>;
