import { types, onSnapshot, applySnapshot, Instance } from 'mobx-state-tree';
import * as localForage from 'localforage';
import axios from 'axios';

import { contacts, contactsScaffold } from './contacts';
import { humans, humansScaffold } from './humans';
import { user, userScaffold } from './user';

const LOCAL_DEV_STORE_NAME = 'miteinander-dev-store';

const axiosInstance = axios.create({ baseURL: 'http://localhost:1234' });

type AxiosSucess<T> = {
  type: 'success';
  data: T;
};

type AxiosError = {
  type: 'error';
  status: number;
  statusText: string;
};

export type AxiosResponse<T> = AxiosSucess<T> | AxiosError;

const appStore = types
  .model('appStore', {
    contacts,
    isDevStoreLoaded: false,
    isLoading: false,
    humans,
    user
  })
  .actions(self => ({
    setIsDevStoreLoaded(value: boolean) {
      self.isDevStoreLoaded = value;
    },
    setIsLoading(value: boolean) {
      self.isLoading = value;
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
    },
    async ajaxGet<T = unknown>(url: string, params: { [key: string]: any }) {
      const response = await axiosInstance.get(url, { params });
      if (response.status < 400) {
        return { type: 'success', data: response.data };
      } else {
        return { type: 'error', status: response.status, statusText: response.statusText };
      }
    },

    async ajaxPost<T = unknown>(url: string, params: { [key: string]: any }) {
      const response = await axiosInstance.post(url, params);
      if (response.status < 400) {
        return { type: 'success', data: response.data };
      } else {
        return { type: 'error', status: response.status, statusText: response.statusText };
      }
    }
  }));

export type ajax = {
  get: <T = unknown>(url: string, params: { [key: string]: any }) => Promise<AxiosResponse<T>>;
  post: <T = unknown>(url: string, params: { [key: string]: any }) => Promise<AxiosResponse<T>>;
};

export type IappStore = Instance<typeof appStore>;

const appStoreScaffold = {
  contacts: contactsScaffold,
  humans: humansScaffold,
  user: userScaffold
};

export function createAppStore() {
  return appStore.create(appStoreScaffold);
}
