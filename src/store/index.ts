import { RouterStore } from 'mobx-react-router';
import { Others } from './others';

export function createStore(routingStore: RouterStore) {
  return {
    others: new Others(),
    routingStore
  };
}

export type Store = ReturnType<typeof createStore>;
