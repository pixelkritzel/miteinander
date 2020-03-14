import { observable, action } from 'mobx';
import { Position } from 'types/position';

import others from 'mockData/others.json';
import { ID } from 'types/id';

type categories = 'ERRANDS' | 'DRIVING' | 'CONTACT' | 'DOG_WALKING' | 'GROCCERIES';
type statuses = 'QUARANTINED' | 'VOLUNTARILY_SELF_ISOLATED' | 'INFECTED';

type other = {
  id: ID;
  lat: number;
  lng: number;
  category: categories;
  status: statuses;
  isVulnerable: boolean;
};

export class Others {
  @observable
  all: other[] = [];

  @action
  load = async (position: Position) => {
    this.all = others as other[];
  };

  findById = (id: ID) => this.all.find(({ id: otherId }) => id === otherId);
}
