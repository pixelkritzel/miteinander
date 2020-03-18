import { types, IAnyType, getRoot, flow, Instance, SnapshotIn } from 'mobx-state-tree';
import { ID } from 'types/id';
import { AxiosResponse } from '..';
import { SIhuman } from '../humans';

export function createCollection<T extends IAnyType>(
  name: string,
  model: T,
  modelScaffold: SnapshotIn<T>,
  baseUrl: string
) {
  return types
    .model(name, {
      all: types.map(model)
    })
    .actions(self => ({
      setItem(id: ID, item: Instance<T> | SnapshotIn<T>) {
        self.all.set(id, item);
      },
      loadById: flow(function*(id: ID) {
        const appStore: any = getRoot(self);
        const response: AxiosResponse<SIhuman> = yield appStore.ajaxGet(`${baseUrl}/${id}`);
        if (response.type === 'success') {
          const { data } = response;
          self.all.set(data.id, data);
          return self.all.get(data.id);
        }
      }) as (id: ID) => Promise<Instance<T> | null>
    }))
    .views(self => {
      function asArray(): Instance<T>[] {
        const array = [];
        for (const [, value] of self.all) {
          array.push(value);
        }
        return array;
      }

      function findById(id: ID) {
        const item = self.all.get(id) as T | undefined;
        if (item) {
          return item;
        } else {
          const item = model.create({ ...modelScaffold, id });
          self.setItem(id, item);
          setImmediate(() => self.loadById(id));
          return item;
        }
      }

      return { asArray, findById };
    });
}
