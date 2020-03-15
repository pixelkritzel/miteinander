import { types, onSnapshot, applySnapshot } from 'mobx-state-tree';
import * as localForage from 'localforage';

import { needingHelp, needingHelpScaffold } from './needing_help';

const LOCAL_DEV_STORE_NAME = 'miteinander-dev-store';

const appStore = types
  .model('appStore', {
    needingHelp: needingHelp,
    isDevStoreLoaded: false
  })
  .actions(self => ({
    setIsDevStoreLoaded(value: boolean) {
      self.isDevStoreLoaded = value;
    }
  }))
  .actions(self => ({
    async afterCreate() {
      if (process.env.NODE_ENV === 'development') {
        const previousSnapshot = await localForage.getItem<any>(LOCAL_DEV_STORE_NAME);
        if (previousSnapshot) {
          applySnapshot(self, previousSnapshot);
        }
      }
      onSnapshot(self, snapShot => {
        localForage.setItem(LOCAL_DEV_STORE_NAME, snapShot);
      });
      self.setIsDevStoreLoaded(true);
    }
  }));

const appStoreScaffold = {
  needingHelp: needingHelpScaffold
};

export function createAppStore() {
  return appStore.create(appStoreScaffold);
}
