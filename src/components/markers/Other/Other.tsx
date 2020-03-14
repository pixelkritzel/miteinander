import * as React from 'react';

import { UndefinedMarker } from '../UndefindeMarker';

import { Position } from 'types/position';
import { ID } from 'types/id';

interface OtherProps {
  markerId: ID;
  onMarkerClick: (id: ID) => void;
  position: Position;
}

export class Other extends React.Component<OtherProps> {
  render() {
    const { markerId, onMarkerClick, position } = this.props;
    return (
      <UndefinedMarker
        backgroundColor='VIOLET'
        borderColor='MEDIUMORCHID'
        width='30px'
        height='30px'
        markerId={markerId}
        onMarkerClick={onMarkerClick}
        opacity='0.5'
        position={position}
      />
    );
  }
}
