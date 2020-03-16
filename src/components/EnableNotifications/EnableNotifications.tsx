import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button } from 'components/Button';
import { HTML } from 'components/HTML';
import { Container } from 'components/Grid/Container';

import { enableNotifications } from 'dict/components/enableNotifications';

import CSS from './EnableNotifications.module.scss';

@observer
export class EnableNotifications extends React.Component {
  @observable
  status: 'unknown' | 'granted' | 'denied' =
    Notification.permission !== 'default' ? Notification.permission : 'unknown';

  askPermission = async () => {
    try {
      await Notification.requestPermission();
      this.status = 'granted';
    } catch (e) {
      this.status = 'denied';
    }
  };

  render() {
    if (this.status === 'unknown') {
      return (
        <Container>
          <div className={CSS.enableNotifications}>
            <p>
              <HTML content={enableNotifications.requestPermission} />
            </p>
            <Button variant='success' size='block' onClick={this.askPermission}>
              {enableNotifications.requestPermissionButton}
            </Button>
          </div>
        </Container>
      );
    }
    if (this.status === 'denied') {
      return (
        <Container>
          <div className={CSS.enableNotifications}>
            <p>
              <HTML content={enableNotifications.deniedText} />
            </p>
            <Button variant='success' size='block'>
              {enableNotifications.deniedButton}
            </Button>
          </div>
        </Container>
      );
    }
    if (this.status === 'granted') {
      return <>{this.props.children}</>;
    }
  }
}
