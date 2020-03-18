import { flow, Instance, SnapshotIn, types, getRoot } from 'mobx-state-tree';

import { AxiosResponse } from './index';
import { createCollection } from './utils/createCollection';

const id = types.identifier;

const helpCategories = types.enumeration([
  'ERRANDS',
  'DRIVING',
  'CONTACT',
  'DOG_WALKING',
  'GROCCERIES'
]);

export type IhelpCategories = Instance<typeof helpCategories>;

const status = types.enumeration(['QUARANTINED', 'VOLUNTARILY_SELF_ISOLATED', 'INFECTED']);
export type Istatus = Instance<typeof status>;

export const human = types.model('human', {
  id: id,
  lat: types.number,
  lng: types.number,
  nickname: types.string,
  needs: types.array(
    types.model({
      category: helpCategories,
      note: types.string
    })
  ),
  status: types.maybe(status),
  isVulnerable: types.boolean
});

const humanScaffold: SIhuman = {
  id: '0',
  lat: 0,
  lng: 0,
  nickname: '',
  needs: [],
  status: undefined,
  isVulnerable: false
};

export type Ihuman = Instance<typeof human>;
export type SIhuman = SnapshotIn<typeof human>;

export const humans = createCollection<typeof human>('humans', human, humanScaffold, '/humans')
  .views(self => ({}))
  .actions(self => ({
    load: flow(function*() {
      const appStore: any = getRoot(self);
      const response: AxiosResponse<SIhuman[]> = yield appStore.ajaxGet('/find_people', {
        userId: appStore.user.id,
        type: 'needs_help'
      });
      if (response.type === 'success') {
        response.data.forEach(person => self.all.set(person.id, person));
      } else {
        console.log(response);
      }
    })
  }));

export const humansScaffold = {
  all: {}
};

export type Ihumans = Instance<typeof humans>;
