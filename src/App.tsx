import React from 'react';

import { observer } from 'mobx-react';
import * as history from 'history';
import { RouterStore, syncHistoryWithStore, SynchronizedHistory } from 'mobx-react-router';
import { Router, Switch, Route } from 'react-router';

import { Map } from 'components/Map';
import { StoreContext } from 'components/StoreContext/StoreContext';
import { Human } from 'components/Human/Human';
import { Store, createStore } from 'store';
import { EnableNotifications } from 'components/EnableNotifications';
import { Contact } from 'components/Contact';
import { LoadingSpinner } from 'components/LoadingSpiner';

@observer
class App extends React.Component {
  store: Store;

  syncedHistory: SynchronizedHistory;

  constructor(props: any, context: any) {
    super(props, context);
    const browserHistory = history.createBrowserHistory();
    const routingStore = new RouterStore();

    this.syncedHistory = syncHistoryWithStore(browserHistory, routingStore);
    this.store = createStore(routingStore);
  }

  render() {
    if (process.env.NODE_ENV === 'development' && !this.store.app.isDevStoreLoaded) {
      return null;
    }

    return (
      <StoreContext.Provider value={this.store}>
        <EnableNotifications>
          <LoadingSpinner isShown={this.store.app.isLoading}>
            <Router history={this.syncedHistory}>
              <Switch>
                <Route path='/humans/:id' component={Human} />
                <Route path='/contacts/:id' component={Contact} />
                <Route path='/'>
                  <Map />
                </Route>
              </Switch>
            </Router>
          </LoadingSpinner>
        </EnableNotifications>
      </StoreContext.Provider>
    );
  }
}

export default App;
