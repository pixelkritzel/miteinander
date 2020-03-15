import { RouterStore } from 'mobx-react-router';
import { createAppStore } from './app';

export function createStore(routingStore: RouterStore) {
  return {
    app: createAppStore(),
    routingStore
  };
}

export type Store = ReturnType<typeof createStore>;
