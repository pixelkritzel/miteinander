import * as React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { MapMarker } from 'components/MapMarker';
import { StoreContext } from 'components/StoreContext';
import { observable } from 'mobx';

import { Position as YourPosition } from 'types/position';
import { observer } from 'mobx-react';
import { LoadingSpinner } from 'components/LoadingSpiner';

const GMAP_OPTIONS = {
  clickableIcons: false,
  disableDefaultUI: true,
  draggable: false,
  keyboardShortcuts: false
};

interface MapProps {}

@observer
export class Map extends React.Component<MapProps> {
  static contextType = StoreContext;
  context!: React.ContextType<typeof StoreContext>;

  @observable
  yourPosition = { lat: 0, lng: 0 };

  getGeolocation = () => {
    return new Promise<YourPosition>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            const { latitude: lat, longitude: lng } = position.coords;
            resolve({ lat, lng });
          },
          () => reject('GEOLOCATION_NOTAVAILABLE')
        );
      } else {
        reject('GEOLOCATION_NOTAVAILABLE');
      }
    });
  };

  async componentDidMount() {
    try {
      this.yourPosition = await this.getGeolocation();
    } catch (e) {
      alert('LOCATION SERVICES NOT AVAILABLE!');
    }
    this.context.app.humans.load();
  }

  render() {
    return (
      <LoadScript
        id='script-loader'
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        loadingElement={LoadingSpinner}
      >
        <GoogleMap
          id='example-map'
          zoom={14.5}
          center={this.yourPosition}
          options={GMAP_OPTIONS}
          mapContainerStyle={{ width: '100%', height: '100vh' }}
        >
          <MapMarker markerId={'1000000'} position={this.yourPosition} variant='you' />

          {this.context.app.humans.asArray().map(({ id, lat, lng }) => (
            <>
              <MapMarker
                markerId={id}
                onMarkerClick={() => {
                  this.context.routingStore.push(`/humans/${id}`);
                }}
                position={{ lat, lng }}
                variant='somebody'
                key={id}
              />
            </>
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }
}
