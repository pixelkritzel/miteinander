import * as React from 'react';
import { OverlayView } from '@react-google-maps/api';

import { Position } from 'types/position';
import { ID } from 'types/id';

interface UndefinedMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor: string;
  borderColor: string;
  markerId: ID;
  onMarkerClick: (id: ID) => void;
  opacity: string;
  position: Position;
  width: string;
  height: string;
}

export class UndefinedMarker extends React.Component<UndefinedMarkerProps> {
  get styles() {
    const { backgroundColor, borderColor, opacity, width, height } = this.props;

    return {
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      border: `2px solid ${borderColor}`,
      borderRadius: '100%',
      opacity: opacity,
      transform: 'translate(-50%, -50%)'
    };
  }

  render() {
    const { markerId, onMarkerClick, position } = this.props;

    return (
      <OverlayView position={position} mapPaneName='overlayMouseTarget'>
        <div onClick={() => onMarkerClick(markerId)} style={this.styles} />
      </OverlayView>
    );
  }
}
