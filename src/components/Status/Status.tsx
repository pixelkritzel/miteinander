import * as React from 'react';

import { Badge, BadgeProps } from 'components/Badge';

import { dict } from 'dict';

const { status: statusDict } = dict.personNeedingHelp;

const variants = {
  QUARANTINED: 'warning',
  VOLUNTARILY_SELF_ISOLATED: 'info',
  INFECTED: 'danger'
};

export class Status extends React.Component<{ status: keyof typeof statusDict }> {
  render() {
    const { status } = this.props;
    return <Badge variant={variants[status] as BadgeProps['variant']}>{statusDict[status]}</Badge>;
  }
}
