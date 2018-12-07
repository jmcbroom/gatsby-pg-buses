import React from 'react';
import mapboxgl from 'mapbox-gl';
import style from '../components/mapstyle';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg';

class StopMap extends React.Component {
    componentDidMount() {
        const stop = this.props.stop

        this.map = new mapboxgl.Map({
          container: this.mapContainer,
          style: style,
          center: [stop.stopLon, stop.stopLat],
          zoom: 18,
          minZoom: 10
        });
    
        this.map.on('load', m => {
            console.log(m)
        })
      }
    
      render() {
        return (
          <div ref={el => this.mapContainer = el} style={{gridColumn: `1 / 2`, gridRow: `2 / 3`, height: 'auto'}} />
        )
      }
}

export default StopMap;