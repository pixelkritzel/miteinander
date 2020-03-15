import * as React from 'react';
import { OverlayView } from '@react-google-maps/api';
import cx from 'classnames';

import { Position } from 'types/position';
import { ID } from 'types/id';

import CSS from './MapMarker.module.scss';

interface MapMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  markerId: ID;
  onMarkerClick?: (id: ID) => void;
  position: Position;
  variant: 'you' | 'somebody';
}

export class MapMarker extends React.Component<MapMarkerProps> {
  render() {
    const { markerId, onMarkerClick, position, variant } = this.props;

    return (
      <OverlayView position={position} mapPaneName='overlayMouseTarget'>
        <div
          onClick={onMarkerClick && (() => onMarkerClick(markerId))}
          className={cx(CSS.marker, CSS[variant])}
        />
      </OverlayView>
    );
  }
}
