import * as React from 'react';

interface HTMLProps extends React.HTMLAttributes<HTMLElement> {
  content: string;
  element?: 'span' | 'div';
}

export class HTML extends React.Component<HTMLProps> {
  static defaultProps = {
    element: 'span'
  };

  render() {
    const { content, element, ...otherProps } = this.props;

    return React.createElement(element!, {
      dangerouslySetInnerHTML: { __html: content },
      ...otherProps
    });
  }
}
