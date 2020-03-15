import React from 'react';

import { observer } from 'mobx-react';
import * as history from 'history';
import { RouterStore, syncHistoryWithStore, SynchronizedHistory } from 'mobx-react-router';
import { Router, Switch, Route } from 'react-router';

import { Map } from 'components/Map';
import { StoreContext } from 'components/StoreContext/StoreContext';
import { Contact } from 'components/Contact/Contact';
import { Store, createStore } from 'store';

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
        <Router history={this.syncedHistory}>
          <Switch>
            <Route path='/contact/:contactId' component={Contact} />
            <Route path='/'>
              <Map />
            </Route>
          </Switch>
        </Router>
      </StoreContext.Provider>
    );
  }
}

export default App;
