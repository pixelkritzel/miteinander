import * as React from 'react';
import cx from 'classnames';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export class Badge extends React.Component<BadgeProps> {
  static defaultProps = {
    variant: 'primary'
  };

  render() {
    const { children, variant, ...otherProps } = this.props;

    return (
      <span className={cx('badge', `badge-${variant}`)} {...otherProps}>
        {children}
      </span>
    );
  }
}
