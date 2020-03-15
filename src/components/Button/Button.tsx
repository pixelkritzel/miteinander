import * as React from 'react';
import cx from 'classnames';

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLInputElement | HTMLAnchorElement> {
  active?: true;
  disabled?: true;
  element?: 'button' | 'a' | 'div' | 'input';
  outline?: true;
  size?: 'lg' | 'sm' | 'block;';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  type?: 'button' | 'submit' | 'reset';
}

export class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    element: 'button',
    className: '',
    type: 'button',
    variant: 'light'
  };

  render() {
    const {
      active,
      children,
      className,
      disabled,
      element,
      outline,
      size,
      type,
      variant,
      ...otherProps
    } = this.props;

    return React.createElement(
      element!,
      {
        type,
        className: cx('btn', className, outline ? `btn-outline-${variant}` : `btn-${variant}`, {
          ['active']: !!active,
          ['disabled']: !!disabled,
          [`btn-${outline}`]: !!outline
        }),
        ariaDisabled: !!disabled,
        disabled: !!disabled,
        ...otherProps
      },
      children
    );
  }
}
