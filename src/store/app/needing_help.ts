import { flow, Instance, SnapshotIn, types } from 'mobx-state-tree';

import { Position } from 'types/position';

import needing_help_data from 'mockData/needing_help.json';
import { ID } from 'types/id';

async function loadData() {
  return needing_help_data;
}

const id = types.identifierNumber;

const categories = types.enumeration([
  'ERRANDS',
  'DRIVING',
  'CONTACT',
  'DOG_WALKING',
  'GROCCERIES'
]);

const status = types.enumeration(['QUARANTINED', 'VOLUNTARILY_SELF_ISOLATED', 'INFECTED']);
export type Istatus = Instance<typeof status>;

const personNeedingHelp = types.model('personNeedingHelp', {
  id: id,
  lat: types.number,
  lng: types.number,
  nickname: types.string,
  needs: types.array(
    types.model({
      category: categories,
      note: types.string
    })
  ),

  status: types.maybe(status),
  isVulnerable: types.boolean
});

export type IpersonNeedingHelp = Instance<typeof personNeedingHelp>;
export type SIpersonNeedingHelp = SnapshotIn<typeof personNeedingHelp>;

export const needingHelp = types
  .model('needingHelp', {
    all: types.array(personNeedingHelp)
  })
  .views(self => ({
    findById(id: ID) {
      return self.all.find(({ id: otherId }) => id === otherId);
    }
  }))
  .actions(self => ({
    load: flow(function*(position: Position) {
      try {
        self.all = yield loadData();
      } catch (e) {
        console.log(e);
      }
    })
  }));

export const needingHelpScaffold = {
  all: []
};

export type IneedingHelp = Instance<typeof needingHelp>;
