import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { StoreContext } from 'components/StoreContext';
import { IpersonNeedingHelp } from 'store/app/needing_help';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Status } from 'components/Status';
import { dict } from 'dict';
import { Badge } from 'components/Badge';
import { Container, Row, Col } from 'components/Grid';
import { Button } from 'components/Button';

interface ContactProps extends RouteComponentProps<{ contactId: string }> {}

@observer
export class Contact extends React.Component<ContactProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  @observable
  contact: IpersonNeedingHelp | null = null;

  async componentDidMount() {
    const { contactId } = this.props.match.params;
    const contact = this.context.app.needingHelp.findById(Number(contactId));
    if (contact) {
      this.contact = contact;
    } else {
      throw new Error(`Unable to resolve contactId ${contactId} `);
    }
  }

  render() {
    if (!this.contact) {
      return null;
    }
    const { isVulnerable, needs, nickname, status } = this.contact;
    return (
      <Container>
        <Row>
          <Col>
            <h1>{nickname}</h1>
            {isVulnerable && (
              <Badge variant='primary'>{dict.personNeedingHelp.isVulnerable}</Badge>
            )}{' '}
            {status && <Status status={status} />}
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{dict.components.contact.asks_for_help_with}</h3>
            {needs.map(({ category, note }, index) => (
              <React.Fragment key={index}>
                <strong>{dict.personNeedingHelp.categories[category]}</strong>
                {!!note.length && <p>{note}</p>}
                <div>
                  <Button variant='primary'>{dict.components.contact.offer_help(nickname)}</Button>
                </div>
              </React.Fragment>
            ))}
          </Col>
        </Row>
        <button type='button' onClick={() => this.context.routingStore.goBack()}>
          Back
        </button>
      </Container>
    );
  }
}
