import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { ID } from 'types/id';

interface ContactProps extends RouteComponentProps<{ contactId: string }> {}

export class Contact extends React.Component<ContactProps> {
  render() {
    const { contactId } = this.props.match.params;

    return (
      <div>
        <span> Contact {contactId}</span>
      </div>
    );
  }
}
