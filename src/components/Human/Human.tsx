import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { StoreContext } from 'components/StoreContext';
import { Ihuman, IhelpCategories } from 'store/app/humans';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Status } from 'components/Status';
import { dict } from 'dict';
import { Badge } from 'components/Badge';
import { Container, Row, Col } from 'components/Grid';
import { Button } from 'components/Button';
import { ID } from 'types/id';

interface HumanProps extends RouteComponentProps<{ id: ID }> {}

@observer
export class Human extends React.Component<HumanProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  @observable
  human: Ihuman | null = null;

  async componentDidMount() {
    const { id } = this.props.match.params;
    const human = this.context.app.humans.findById(id);
    if (human) {
      this.human = human;
    } else {
      throw new Error(`Unable to resolve id ${id} `);
    }
  }

  newContact = async (id: ID, category: IhelpCategories) => {
    const { app } = this.context;
    app.setIsLoading(true);
    const contact = await this.context.app.contacts.newContact(id, category);
    app.setIsLoading(false);
    this.context.routingStore.push(`/contacts/${contact.id}`);
  };

  render() {
    if (!this.human) {
      return null;
    }
    const { id, isVulnerable, needs, nickname, status } = this.human;
    return (
      <Container>
        <Row>
          <Col>
            <h1>{nickname}</h1>
            {isVulnerable && (
              <Badge variant='primary'>{dict.components.human.isVulnerable}</Badge>
            )}{' '}
            {status && <Status status={status} />}
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{dict.components.human.asks_for_help_with}</h3>
            {needs.map(({ category, note }, index) => (
              <React.Fragment key={index}>
                <strong>{dict.components.human.categories[category]}</strong>
                {!!note.length && <p>{note}</p>}
                <div>
                  <Button variant='primary' onClick={() => this.newContact(id, category)}>
                    {dict.components.human.offer_help(nickname)}
                  </Button>
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
