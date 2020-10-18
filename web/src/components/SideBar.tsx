import React from 'react'
import mapMarkerImg from "../img/marker.svg";
import {FiArrowLeft} from "react-icons/fi";
import {useHistory} from 'react-router-dom';

import '../css/components/sidebar.css';

const SideBar = () => {
  const {goBack} = useHistory();

  return (
    <aside className={'app-sidebar'}>
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  )
}

export default SideBar;