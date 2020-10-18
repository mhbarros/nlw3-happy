import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from "react-icons/fi";
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import MapMarkerIcon from '../img/marker.svg'
import MapMarker from "../utils/MapMarker";

import '../css/home.css';
import Api from "../services/api";

import Orphanage from "../interfaces/Orphanage";

const Home = () => {

  const [orphanageList, setOrphanageList] = useState<Orphanage[]>([]);

  console.log(orphanageList);

  useEffect(() => {
    Api.get('/orphanage').then(response => {
      setOrphanageList(response.data.data);
    })
  }, []);


  return (
    <div id={'home-container'}>
      <aside>
        <header>
          <img src={MapMarkerIcon} alt={'Logo'} />
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
        {
          orphanageList.map(orph => {
            return(
              <Marker key={orph.id} position={[orph.latitude, orph.longitude]} icon={MapMarker}>
                <Popup closeButton={false} minWidth={240} maxWidth={240} className={'marker-popup'}>
                  {orph.name}
                  <Link to={`/orphanages/${orph.id}`}>
                    <FiArrowRight size={20} color={'#fff'} />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>
      <Link to={'/orphanages/create'} id={'create-orphanage'}>
        <FiPlus size={32} color={'white'} />
      </Link>
    </div>
  )
}

export default Home;