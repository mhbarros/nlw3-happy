import React from 'react';
import {Link} from 'react-router-dom';
import {FiPlus} from "react-icons/fi";
import {Map, TileLayer} from 'react-leaflet';

import '../css/home.css';
import 'leaflet/dist/leaflet.css';

import MapMarker from '../img/marker.svg'

const Home = () => {
  return (
    <div id={'home-container'}>
      <aside>
        <header>
          <img src={MapMarker} alt={'Logo'} />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>
        <footer>
          <strong>Rio de Janeiro</strong>
          <span>RJ</span>
        </footer>
      </aside>
      <Map
        center={[-22.9327058,-43.1844011]}
        zoom={15}
        style={{width: '100%', height: '100%'}}>
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>
      <Link to={'abc'} id={'create-orphanage'}>
        <FiPlus size={32} color={'white'} />
      </Link>
    </div>
  )
}

export default Home;