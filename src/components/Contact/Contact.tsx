import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Col, Container, Row } from 'components/Grid';

import { dict } from 'dict';
import { ID } from 'types/id';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Icontact } from 'store/app/contacts';
import { StoreContext } from 'components/StoreContext';
import { Badge } from 'components/Badge';
import { Status } from 'components/Status';

interface ContactProps extends RouteComponentProps<{ id: ID }> {}

@observer
export class Contact extends React.Component<ContactProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  @observable
  contact: Icontact | null = null;

  async componentDidMount() {
    const { id } = this.props.match.params;
    const contact = this.context.app.contacts.findById(id);
    if (contact) {
      this.contact = contact;
    } else {
      throw new Error(`Unable to resolve id ${id} `);
    }
  }

  render() {
    if (!this.contact || !this.contact.recipient) {
      return null;
    }

    const { isVulnerable, status, nickname } = this.contact.recipient;
    return (
      <Container>
        <Row>
          <Col>
            {dict.components.contact.your_contact_with}
            {nickname}
          </Col>
        </Row>
        <Row>
          <Col>
            {isVulnerable && <Badge variant='primary'>{dict.components.human.isVulnerable}</Badge>}{' '}
            {status && <Status status={status} />}
          </Col>
        </Row>
      </Container>
    );
  }
}
