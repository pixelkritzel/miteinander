import * as React from 'react';

import { Position } from 'types/position';
import { UndefinedMarker } from '../UndefindeMarker';
import { ID } from 'types/id';

interface YouProps {
  markerId: ID;
  onMarkerClick: (id: ID) => void;
  position: Position;
}

export class You extends React.Component<YouProps> {
  render() {
    const { markerId, onMarkerClick, position } = this.props;

    return (
      <UndefinedMarker
        backgroundColor='SKYBLUE'
        borderColor='DEEPSKYBLUE'
        width='20px'
        height='20px'
        markerId={markerId}
        onMarkerClick={onMarkerClick}
        opacity='0.8'
        position={position}
      />
    );
  }
}
