import { Instance, types, flow, getRoot, SnapshotIn } from 'mobx-state-tree';
import { human, Ihumans } from 'store/app/humans';
import { ID } from 'types/id';
import { IhelpCategories } from './humans';
import { AxiosResponse } from '.';
import { createCollection } from './utils/createCollection';

const contact = types.model('contact', {
  createdAt: types.string,
  connectionDate: types.maybeNull(types.string),
  id: types.identifier,
  recipient: types.maybe(
    types.reference(human, {
      get(id: ID, parent) {
        const { humans }: { humans: Ihumans } = getRoot(parent!);
        return humans.findById(id);
      },
      set(human) {
        return human.id;
      }
    })
  ),
  status: types.enumeration(['open', 'connected', 'closed'])
});

const contactScaffold: SIcontact = {
  createdAt: '',
  connectionDate: null,
  id: '',
  status: 'open'
};

export type Icontact = Instance<typeof contact>;
type SIcontact = SnapshotIn<typeof contact>;

export const contacts = createCollection<typeof contact>(
  'contacts',
  contact,
  contactScaffold,
  '/contacts'
).actions(self => ({
  newContact: flow(function*(recipientId: ID, category: IhelpCategories) {
    const appStore: any = getRoot(self);
    const response: AxiosResponse<SIcontact> = yield appStore.ajaxPost('/contacts', {
      userId: appStore.user.id,
      recipientId,
      category
    });
    if (response.type === 'success') {
      const instance = contact.create(response.data);
      self.all.set(instance.id, instance);
      return self.all.get(instance.id);
    } else {
      console.log(response.status);
    }
  }) as (recipientId: ID, category: IhelpCategories) => Promise<Icontact>
}));

export const contactsScaffold = {
  all: {}
};
