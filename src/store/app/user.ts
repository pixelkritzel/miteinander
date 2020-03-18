import { types } from 'mobx-state-tree';

export const user = types.model('user', {
  id: types.identifier
});

export const userScaffold = {
  id: '1000000'
};
