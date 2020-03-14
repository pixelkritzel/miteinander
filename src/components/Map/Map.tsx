import * as React from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';

import { You } from 'components/markers/You/You';
import { Other } from 'components/markers/Other';
import { StoreContext } from 'components/StoreContext';
import { observable } from 'mobx';

import { Position as YourPosition } from 'types/position';
import { observer } from 'mobx-react';

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

  overlay: OverlayView | null = null;

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
    await this.context.others.load(this.yourPosition);
  }

  render() {
    return (
      <LoadScript id='script-loader' googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap
          id='example-map'
          zoom={14.5}
          center={this.yourPosition}
          options={GMAP_OPTIONS}
          mapContainerStyle={{ width: '100%', height: '100vh' }}
        >
          <You markerId={1000000} onMarkerClick={alert} position={this.yourPosition} />
          {this.context.others.all.map(({ lat, lng, id }, index) => (
            <Other
              markerId={id}
              onMarkerClick={() => {
                console.log('click');
                this.context.routingStore.push(`/contact/${id}`);
              }}
              position={{ lat, lng }}
              key={id}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }
}
