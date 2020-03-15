import * as React from 'react';
import cx from 'classnames';

export const Col: React.FC<{ additionalClassNames?: string }> = ({
  additionalClassNames = '',
  children
}) => <div className={cx('col', additionalClassNames)}>{children}</div>;
